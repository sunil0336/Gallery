export default function FeedItem({ text }) {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 
                    rounded-md px-3 py-2 text-sm text-gray-200">
      {text}
    </div>
  );
}
