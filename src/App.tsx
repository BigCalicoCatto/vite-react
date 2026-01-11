import { useState } from 'react';

const MakanApaHariNi = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [currentView, setCurrentView] = useState<string>('makan');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [recentlyShown, setRecentlyShown] = useState<string[]>([]);

  const foodData: Record<string, string[]> = {
    tomyam: ["Tom Yam Campur", "Nasi Goreng Paprik", "Kuey Teow Goreng", "Mee Goreng Basah", "Ayam Masak Merah", "Sup Tulang", "Nasi Goreng Tom Yam", "Daging Black Pepper", "Ikan Tiga Rasa", "Sotong Celup Tepung"],
    mamak: ["Roti Canai", "Roti Tissue", "Nasi Kandar + Ayam Goreng", "Maggi Goreng", "Murtabak Daging", "Tosai", "Roti Bom", "Nasi Lemak Ayam Goreng", "Mee Goreng Mamak", "Teh Tarik + Roti Bakar", "Nasi Kandar + Kari Ayam", "Indomie Goreng Telur"],
    random: ["Nasi Ayam Penyet", "Nasi Lemak Rendang", "Nasi Kerabu", "Laksa Johor", "Nasi Briyani", "Chicken Chop", "Fish and Chips", "Spaghetti Carbonara", "Nasi Arab Mandy", "Burger Ramly Special", "Ayam Geprek", "Nasi Kukus Ayam Berempah"]
  };

  const drinkData: string[] = ["Teh Tarik", "Teh O Ais Limau", "Kopi O", "Milo Ais", "Sirap Bandung", "Air Limau Ais", "Teh C Peng", "Nescafe Ais", "Milo Tabur", "Horlicks Ais", "Cham", "Kopi Jantan", "Teh Halia", "Ribena Ais"];

  const placeData: string[] = ["Kedai Mamak", "Kedai Tomyam", "KFC", "McDonald's", "Pelita Nasi Kandar", "OldTown White Coffee", "Secret Recipe", "The Chicken Rice Shop", "Nando's", "Sushi King", "Pizza Hut", "myBurgerLab", "Boat Noodle", "Texas Chicken", "Marrybrown"];

  const getRandomFakeNumber = (): number => {
    const numbers = [234, 411, 456, 512, 578, 649, 666, 678, 723, 801];
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const getAllFood = (): string[] => [...foodData.tomyam, ...foodData.mamak, ...foodData.random];

  const getWeightedRandom = (items: string[]): string => {
    const availableItems = items.filter(item => !recentlyShown.includes(item));
    const itemsToUse = availableItems.length > 0 ? availableItems : items;
    return itemsToUse[Math.floor(Math.random() * itemsToUse.length)];
  };

  const randomize = () => {
    setIsAnimating(true);
    let result: string;
    if (currentView === 'makan') {
      const foodList = selectedCategory === 'semua' ? getAllFood() : foodData[selectedCategory];
      result = getWeightedRandom(foodList);
    } else if (currentView === 'minum') {
      result = getWeightedRandom(drinkData);
    } else {
      result = getWeightedRandom(placeData);
    }
    setTimeout(() => {
      setSelectedItem(result);
      setLikeCount(getRandomFakeNumber());
      setRecentlyShown(prev => [result, ...prev].slice(0, 15));
      setIsAnimating(false);
    }, 400);
  };

  const handleLike = () => setLikeCount(prev => prev + 1);
  const switchView = (view: string) => {
    setCurrentView(view);
    setSelectedItem(null);
    setSelectedCategory('semua');
    setMenuOpen(false);
  };
  const selectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setMenuOpen(false);
  };
  const getViewTitle = (): string => {
    if (currentView === 'makan') return 'Makan Apa Hari Ni?';
    if (currentView === 'minum') return 'Minum Apa Hari Ni?';
    return 'Makan Mana Hari Ni?';
  };

  const categories = [
    { id: 'semua', name: 'Semua' },
    { id: 'mamak', name: 'Kedai Mamak' },
    { id: 'tomyam', name: 'Kedai Tomyam' },
    { id: 'random', name: 'Menu Lain' }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 relative">
        
        <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-6 right-6 p-3 hover:bg-gray-100 rounded-lg transition-all z-30 text-2xl">
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">MENU</h3>
              <button onClick={() => setMenuOpen(false)} className="text-2xl">✕</button>
            </div>

            <div className="mb-6">
              <button onClick={() => switchView('makan')} className={`w-full text-left p-4 rounded-lg mb-2 font-semibold transition-all ${currentView === 'makan' ? 'bg-orange-500 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}>
                🍽️ Makan Apa Hari Ni?
              </button>
              <button onClick={() => switchView('minum')} className={`w-full text-left p-4 rounded-lg mb-2 font-semibold transition-all ${currentView === 'minum' ? 'bg-blue-500 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}>
                🥤 Minum Apa Hari Ni?
              </button>
              <button onClick={() => switchView('makanmana')} className={`w-full text-left p-4 rounded-lg font-semibold transition-all ${currentView === 'makanmana' ? 'bg-green-500 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}>
                📍 Makan Mana Hari Ni?
              </button>
            </div>

            {currentView === 'makan' && (
              <>
                <div className="text-sm text-gray-500 mb-2 font-medium">Kategori</div>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => selectCategory(cat.id)} className={`w-full text-left p-3 rounded-lg transition-all text-sm ${selectedCategory === cat.id ? 'bg-orange-100 text-orange-700 font-medium' : 'bg-gray-50 hover:bg-gray-100'}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 z-40" />}

        <div className="w-full max-w-md text-center px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{getViewTitle()}</h1>

          {selectedItem ? (
            <div className={`mb-8 transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl shadow-lg mb-6">
                <div className="text-7xl mb-4">{currentView === 'makan' ? '🍽️' : currentView === 'minum' ? '🥤' : '📍'}</div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{selectedItem}</h2>
              </div>

              <div className="mb-6 text-gray-600 text-sm">
                👍 <span className="font-semibold">{likeCount} orang</span> suka ni hari ini!
              </div>

              <div className="space-y-3">
                <button onClick={handleLike} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all">
                  <span className="text-xl">👍</span>
                  <span>SUKA!</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={randomize} className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <span className="text-xl">👎</span>
                    <span>Tak Nak</span>
                  </button>
                  <button onClick={randomize} disabled={isAnimating} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <span className={`text-xl ${isAnimating ? 'animate-spin inline-block' : ''}`}>🔄</span>
                    <span>Cuba Lagi</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12">
              <button onClick={randomize} disabled={isAnimating} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 px-8 rounded-2xl text-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg">
                <span className={`text-3xl ${isAnimating ? 'animate-spin inline-block' : ''}`}>🔄</span>
                <span>Randomize!</span>
              </button>
              <p className="text-gray-400 text-sm mt-4">Tekan untuk suggestion!</p>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
            <a href="#about" className="hover:text-gray-900">About</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-gray-900">Privacy</a>
            <span>•</span>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MakanApaHariNi;
