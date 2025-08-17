import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  IconChartBar,
  IconChefHat,
  IconCategory,
  IconCalendarTime,
  IconPlus
} from '@tabler/icons-react';
import { listMenusPaginated, listAllMenus } from '../store/slices/menuSlice';
import { listMenuCategoriesPaginated, listAllMenuCategories } from '../store/slices/menuCategorySlice';
import { listReservations } from '../store/slices/reservationSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const menuState = useSelector((state) => state.menus.paginated);
  const menuListState = useSelector((state) => state.menus.list);
  const categoryState = useSelector((state) => state.menuCategories.paginated);
  const categoryListState = useSelector((state) => state.menuCategories.list);
  const reservationState = useSelector((state) => state.reservations.list);
  
  const [stats, setStats] = useState({
    totalMenus: 0,
    totalCategories: 0,
    totalReservations: 0,
    recentMenus: [],
    recentCategories: [],
    recentReservations: [],
  });

  useEffect(() => {
    dispatch(listMenusPaginated({ page: 0, size: 5 }));
    dispatch(listAllMenus());
    dispatch(listMenuCategoriesPaginated({ page: 0, size: 5 }));
    dispatch(listAllMenuCategories());
    dispatch(listReservations({ page: 0, size: 5 }));
  }, [dispatch]);

  useEffect(() => {
    const menusContent = (menuState.content && menuState.content.length > 0)
      ? menuState.content
      : (menuListState.content || []);
    const categoriesContent = (categoryState.content && categoryState.content.length > 0)
      ? categoryState.content
      : (categoryListState.content || []);

    setStats({
      totalMenus: Number(menuState.totalElements) || menusContent.length || 0,
      totalCategories: Number(categoryState.totalElements) || categoriesContent.length || 0,
      totalReservations: Number(reservationState.totalElements) || (reservationState.content || []).length || 0,
      recentMenus: menusContent.slice(0, 3),
      recentCategories: categoriesContent.slice(0, 3),
      recentReservations: (reservationState.content || []).slice(0, 3),
    });
  }, [menuState, menuListState, categoryState, categoryListState, reservationState]);

  const isLoading = menuState.loading || categoryState.loading || reservationState.loading;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kontrollzentrum</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-700/20 rounded-lg p-6 shadow-lg border border-emerald-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <IconChefHat className="mr-2 text-emerald-500" />
              Menüs
            </h2>
            <Link to="/admin/menus" className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-sm">
              Verwalten
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-white">{stats.totalMenus || 0}</p>
              <p className="text-xs text-gray-400">Gesamtmenüs</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg text-center col-span-2">
              <p className="text-sm text-gray-400">Zuletzt hinzugefügt</p>
              <div className="mt-2 space-y-2">
                {(stats.recentMenus || []).map((m) => (
                  <div key={m.id} className="flex items-center justify-between text-gray-300 text-sm">
                    <span className="truncate mr-2">{m.name}</span>
                    <span className="text-emerald-400">#{m.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 rounded-lg p-6 shadow-lg border border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <IconCategory className="mr-2 text-blue-500" />
              Kategorien
            </h2>
            <Link to="/admin/categories" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm">
              Verwalten
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-white">{stats.totalCategories || 0}</p>
              <p className="text-xs text-gray-400">Gesamtkategorien</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg col-span-2">
              <p className="text-sm text-gray-300">Zuletzt hinzugefügt</p>
              <div className="mt-2 space-y-2">
                {(stats.recentCategories || []).map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-gray-300 text-sm">
                    <span className="truncate mr-2">{c.name}</span>
                    <span className="text-blue-400">#{c.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-700/20 rounded-lg p-6 shadow-lg border border-purple-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <IconCalendarTime className="mr-2 text-purple-500" />
              Reservierungen
            </h2>
            <Link to="/admin/reservations" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm">
              Verwalten
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
              <p className="text-3xl font-bold text-white">{stats.totalReservations || 0}</p>
              <p className="text-xs text-gray-400">Gesamtreservierungen</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg col-span-2">
              <p className="text-sm text-gray-300">Zuletzt hinzugefügt</p>
              <div className="mt-2 space-y-2">
                {(stats.recentReservations || []).map((r) => (
                  <div key={r.id} className="flex items-center justify-between text-gray-300 text-sm">
                    <span className="truncate mr-2">{r.customerName} {r.customerSurname}</span>
                    <span className="text-purple-400">{r.reservationDate} {r.reservationTime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Schnellzugriff</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/admin/menus/new" className="bg-gradient-to-br from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
            <IconChefHat className="h-8 w-8 mb-2" />
            <span>Neues Menü</span>
          </Link>
          <Link to="/admin/categories/new" className="bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
            <IconCategory className="h-8 w-8 mb-2" />
            <span>Neue Kategorie</span>
          </Link>
          <Link to="/admin/reservations" className="bg-gradient-to-br from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
            <IconCalendarTime className="h-8 w-8 mb-2" />
            <span>Reservierungen</span>
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <IconChefHat className="mr-2 text-emerald-500" size={20} />
            Zuletzt hinzugefügte Menüs
          </h2>
          <Link to="/admin/menus" className="text-emerald-500 hover:text-emerald-400 text-sm">
            Alle anzeigen
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (stats.recentMenus || []).length > 0 ? (
          <div className="space-y-3">
            {(stats.recentMenus || []).map((menu) => (
              <div key={menu.id} className="bg-gray-700/50 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center mr-3 overflow-hidden">
                    {menu.imageUrl ? (
                      <img src={menu.imageUrl} alt={menu.name} className="w-10 h-10 object-cover" />
                    ) : (
                      <IconChefHat className="text-gray-400" size={20} />
                    )}
                  </div>
                  <div className="font-medium text-white">{menu.name}</div>
                </div>
                <div className="flex items-center">
                  <Link to={`/admin/menus/edit/${menu.id}`} className="text-emerald-400 hover:text-emerald-300">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Noch keine Menüs vorhanden
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
