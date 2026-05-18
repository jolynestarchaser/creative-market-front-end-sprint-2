const UserCard = () => {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl bg-white p-5 md:flex-row md:items-center md:px-6 md:py-6">
      <div className="h-16 w-16 rounded-full bg-gray-200 md:h-18 md:w-18" />

      <div>
        <h2 className="text-lg font-bold text-gray-900 md:text-xl">
          Luna Atelier
        </h2>
        <p className="mt-1 text-sm text-gray-400">@lunaatelier</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">
            Customer
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
