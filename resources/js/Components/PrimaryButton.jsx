export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className="w-full justify-center py-2 px-4 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
            disabled={disabled}
        >
            {children}
        </button>
    );
}
