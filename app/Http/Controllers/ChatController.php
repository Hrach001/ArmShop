<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $chats = Chat::query()
            ->where(function ($query) use ($userId) {
                $query->where('buyer_id', $userId)
                    ->orWhere('seller_id', $userId);
            })
            ->with([
                'buyer:id,name',
                'seller:id,name',
                'messages' => function ($query) {
                    $query->latest()->limit(1);
                },
            ])
            ->withCount([
                'messages as unread_count' => function ($query) use ($userId) {
                    $query->where('user_id', '!=', $userId)
                        ->whereNull('read_at');
                },
            ])
            ->latest('updated_at')
            ->get()
            ->map(function ($chat) use ($userId) {
                $otherUser = $chat->buyer_id === $userId
                    ? $chat->seller
                    : $chat->buyer;

                return [
                    'id' => $chat->id,
                    'other_user' => $otherUser,
                    'last_message' => $chat->messages->first(),
                    'unread_count' => $chat->unread_count,
                    'updated_at' => $chat->updated_at,
                ];
            });

        return Inertia::render('Chats/Index', [
            'chats' => $chats,
        ]);
    }

    public function start(User $seller)
    {
        abort_if(auth()->id() === $seller->id, 403);

        $chat = Chat::firstOrCreate([
            'buyer_id' => auth()->id(),
            'seller_id' => $seller->id,
        ]);

        return redirect()->route('chats.show', $chat->id);
    }

    public function show(Chat $chat)
    {
        abort_if(
            $chat->buyer_id !== auth()->id() && $chat->seller_id !== auth()->id(),
            403
        );

        $chat->messages()
            ->where('user_id', '!=', auth()->id())
            ->whereNull('read_at')
            ->update([
                'read_at' => now(),
            ]);

        $chat->load([
            'buyer',
            'seller',
            'messages.user',
        ]);

        $chat->messages = $chat->messages->sortBy('created_at')->values();

        return Inertia::render('Chats/Show', [
            'chat' => $chat,
        ]);
    }

    public function storeMessage(Request $request, Chat $chat)
    {
        abort_if(
            $chat->buyer_id !== auth()->id() && $chat->seller_id !== auth()->id(),
            403
        );

        $validated = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
        ]);

        Message::create([
            'chat_id' => $chat->id,
            'user_id' => auth()->id(),
            'message' => $validated['message'],
        ]);

        $chat->touch();

        return redirect()->route('chats.show', $chat->id);
    }
}
