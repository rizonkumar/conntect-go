const LocationItem = ({ title, subtitle, icon }) => (
  <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <p className="font-medium">{title}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

export default LocationItem;
