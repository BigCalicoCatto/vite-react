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
    }, 300);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      
      {/* Hamburger Button - Clean & Modern */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all hover:scale-110 active:scale-95"
      >
        <div className="space-y-1.5">
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Side Menu - Sleek */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-300 ease-out z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full overflow-y-auto">
          
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Menu</h3>

          <div className="space-y-3 mb-8">
            <button onClick={() => switchView('makan')} className={`w-full text-left p-5 rounded-2xl font-semibold transition-all ${currentView === 'makan' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
              <span className="text-2xl mr-3">🍽️</span>
              Makan Apa Hari Ni?
            </button>
            <button onClick={() => switchView('minum')} className={`w-full text-left p-5 rounded-2xl font-semibold transition-all ${currentView === 'minum' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
              <span className="text-2xl mr-3">🥤</span>
              Minum Apa Hari Ni?
            </button>
            <button onClick={() => switchView('makanmana')} className={`w-full text-left p-5 rounded-2xl font-semibold transition-all ${currentView === 'makanmana' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
              <span className="text-2xl mr-3">📍</span>
              Makan Mana Hari Ni?
            </button>
          </div>

          {currentView === 'makan' && (
            <>
              <div className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">Kategori Makanan</div>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => selectCategory(cat.id)} className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedCategory === cat.id ? 'bg-orange-100 text-orange-700 font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 z-30 backdrop-blur-sm" />}

      {/* Main Content - Clean Center */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          
          <h1 className="text-5xl md:text-6xl font-black text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {getViewTitle()}
          </h1>

          {selectedItem ? (
            <div className={`transition-all duration-300 ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
              
              {/* Result Card - Beautiful */}
              <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8 border border-gray-100">
                <div className="text-8xl text-center mb-6 animate-bounce">
                  {currentView === 'makan' ? '🍽️' : currentView === 'minum' ? '🥤' : '📍'}
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-900 leading-tight mb-4">
                  {selectedItem}
                </h2>
                <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-full py-2 px-4 inline-block">
                  <span className="font-semibold text-orange-600">{likeCount} orang</span> suka ni hari ini! 👍
                </div>
              </div>

              {/* Action Buttons - Modern */}
              <div className="space-y-3">
                <button onClick={handleLike} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">👍</span>
                  SUKA!
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={randomize} className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                    <span className="text-xl">👎</span>
                    Tak Nak
                  </button>
                  <button onClick={randomize} disabled={isAnimating} className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                    <span className={`text-xl ${isAnimating ? 'animate-spin inline-block' : ''}`}>🔄</span>
                    Cuba Lagi
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button onClick={randomize} disabled={isAnimating} className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-black py-8 px-12 rounded-3xl text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 mx-auto">
                <span className={`text-5xl ${isAnimating ? 'animate-spin inline-block' : ''}`}>🎲</span>
                <span>RANDOMIZE!</span>
              </button>
              <p className="text-gray-400 mt-6 text-sm">Tekan untuk dapatkan suggestion! ✨</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Minimal */}
      <footer className="fixed bottom-0 w-full bg-white bg-opacity-80 backdrop-blur-md border-t border-gray-100 py-3">
        <div className="text-center text-xs text-gray-400 space-x-3">
          <a href="#about" className="hover:text-gray-600 transition-colors">About</a>
          <span>•</span>
          <a href="#privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
          <span>•</span>
          <a href="#contact" className="hover:text-gray-600 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default MakanApaHariNi;
