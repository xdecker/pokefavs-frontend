import { FavoritesList } from "@/components";

export default function FavoritePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="m-3">
        {/* see list and save */}
        <h1 className="text-3xl  font-semibold text-slate-700">
          Your Favorite Pokemon List
        </h1>

        <p className="text-slate-500">
          Review your list before generating your unique code
        </p>
      </div>

      <FavoritesList />
    </div>
  );
}
