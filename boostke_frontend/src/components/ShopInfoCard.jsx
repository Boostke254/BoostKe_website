export default function ShopInfoCard({ shop_id, shop_logo, shop_name }) {
  return (
    <div className="flex items-center h-full gap-4 pe-6 rounded-lg shadow-sm w-fit border-1 border-gray-200 overflow-hidden">
      {/* Shop Logo */}
      <img
        src={shop_logo}
        alt={shop_name}
        className="w-1/3 h-full object-cover"
      />

      <div className="flex flex-col gap-1 w-2/3">
        <p className="text-[10px] text-gray-600">Posted by</p>
        {/* Shop Name */}
        <h5 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {shop_name}
        </h5>

        {/* View Shop Button */}
        <a
          className="text-xs border-1 border-orange-100 rounded-md px-3 py-1 text-orange-600 hover:bg-orange-100 transition-all duration-300 w-fit"
          href={`/vendors/${shop_name}/${shop_id}`}
        >
          View Shop
        </a>
      </div>
    </div>
  );
}
