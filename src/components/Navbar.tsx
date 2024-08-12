const Navbar = () => {
  return (
    <div className="border-b border-neutral-200 flex justify-between items-center p-3">
      <h1 className="text-4xl text-blue-500 font-medium flex items-center gap-2">
        heru
        <span className="bg-blue-100 px-2 p-1 text-xs rounded mt-1.5">Plus</span>
      </h1>
      <div className="size-9 rounded-full bg-white"></div>
      <box-icon name='cog'></box-icon>
    </div>
  );
};

export default Navbar;
