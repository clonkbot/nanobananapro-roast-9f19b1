import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Politician {
  id: string;
  name: string;
  nickname: string;
  emoji: string;
}

interface Roast {
  setup: string;
  punchline: string;
}

const politicians: Politician[] = [
  { id: 'trump', name: 'Donald Trump', nickname: 'The Orange Menace', emoji: '🍊' },
  { id: 'vance', name: 'JD Vance', nickname: 'Couch Connoisseur', emoji: '🛋️' },
  { id: 'desantis', name: 'Ron DeSantis', nickname: 'Florida Man Supreme', emoji: '🐊' },
];

const roasts: Record<string, Roast[]> = {
  trump: [
    { setup: "BREAKING: Scientists discover", punchline: "Trump's tan is actually contagious. CDC on high alert." },
    { setup: "EXCLUSIVE: Trump claims", punchline: "he invented the color orange. Crayola considering lawsuit." },
    { setup: "SHOCKING: New study reveals", punchline: "Trump's hair has achieved sentience, demands own cabinet position." },
    { setup: "ALERT: Trump announces", punchline: "he's suing the sun for copyright infringement on his complexion." },
    { setup: "URGENT: Mar-a-Lago declares", punchline: "independence, issues own currency: the TrumpCoin (worth nothing)." },
  ],
  vance: [
    { setup: "BREAKING: JD Vance spotted", punchline: "at furniture store, security called. Again." },
    { setup: "EXCLUSIVE: Vance's memoir reveals", punchline: "his best friend growing up was a La-Z-Boy recliner." },
    { setup: "SHOCKING: Scientists confirm", punchline: "Vance's beard grows faster near upholstery." },
    { setup: "ALERT: Vance introduces bill", punchline: "to make couches a protected class." },
    { setup: "URGENT: Vance seen", punchline: "whispering sweet nothings to ottoman at IKEA." },
  ],
  desantis: [
    { setup: "BREAKING: DeSantis attempts", punchline: "to ban mirrors after seeing his approval ratings." },
    { setup: "EXCLUSIVE: DeSantis declares", punchline: "war on the concept of smiling. 'Too woke,' he says." },
    { setup: "SHOCKING: Scientists discover", punchline: "DeSantis is actually three angry HOA members in a suit." },
    { setup: "ALERT: Florida man", punchline: "wrestles alligator. It was DeSantis. He lost." },
    { setup: "URGENT: DeSantis bans", punchline: "the letter 'W' from Florida schools. Too woke." },
  ],
};

const bananaQuotes = [
  "nanobananapro says: This roast is potassium-powered!",
  "nanobananapro certified: 100% organic burns!",
  "nanobananapro approved: Peel the truth!",
  "nanobananapro declares: No politician is safe!",
  "nanobananapro warns: Slippery when roasted!",
];

function App() {
  const [selectedPolitician, setSelectedPolitician] = useState<Politician | null>(null);
  const [currentRoast, setCurrentRoast] = useState<Roast | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [bananaQuote, setBananaQuote] = useState(bananaQuotes[0]);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateRoast = () => {
    if (!selectedPolitician) return;

    setIsGenerating(true);
    setCurrentRoast(null);

    // Dramatic delay for effect
    setTimeout(() => {
      const politicianRoasts = roasts[selectedPolitician.id];
      const randomRoast = politicianRoasts[Math.floor(Math.random() * politicianRoasts.length)];
      const randomQuote = bananaQuotes[Math.floor(Math.random() * bananaQuotes.length)];

      setCurrentRoast(randomRoast);
      setBananaQuote(randomQuote);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Animated noise background */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal stripes background */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #FFE135 0px,
            #FFE135 2px,
            transparent 2px,
            transparent 20px
          )`,
        }}
      />

      {/* Glitch overlay */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #FF1493 50%, transparent 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-4 md:py-6 px-4"
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Breaking news ticker */}
            <motion.div
              className="bg-red-600 text-white py-1 px-3 md:px-4 mb-4 md:mb-6 inline-block -rotate-1"
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-mono text-xs md:text-sm tracking-wider">BREAKING NEWS</span>
            </motion.div>

            {/* Main title */}
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none ${glitchActive ? 'translate-x-1' : ''}`}
              style={{ fontFamily: 'Bangers, cursive' }}
            >
              <span className="text-[#FFE135] drop-shadow-[0_0_30px_rgba(255,225,53,0.5)]">nano</span>
              <span className="text-[#FF1493]">banana</span>
              <span className="text-[#00D4FF]">pro</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-2xl text-white/80 mt-2 md:mt-4 -rotate-1"
              style={{ fontFamily: 'Permanent Marker, cursive' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ROAST MACHINE 3000
            </motion.p>
          </div>
        </motion.header>

        {/* Politician selector */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="px-4 py-4 md:py-8"
        >
          <h2
            className="text-center text-xl md:text-2xl text-[#FFE135] mb-4 md:mb-6"
            style={{ fontFamily: 'Bangers, cursive' }}
          >
            SELECT YOUR VICTIM
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {politicians.map((politician, index) => (
              <motion.button
                key={politician.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPolitician(politician)}
                className={`relative px-4 md:px-6 py-3 md:py-4 border-4 border-white transition-all duration-200 min-h-[60px] ${
                  selectedPolitician?.id === politician.id
                    ? 'bg-[#FF1493] border-[#FFE135] shadow-[0_0_30px_rgba(255,20,147,0.5)]'
                    : 'bg-transparent hover:bg-white/10'
                }`}
              >
                <span className="text-2xl md:text-3xl mr-2">{politician.emoji}</span>
                <span
                  className="text-white text-base md:text-xl"
                  style={{ fontFamily: 'Bangers, cursive' }}
                >
                  {politician.name}
                </span>
                <div
                  className="text-[#FFE135] text-xs md:text-sm mt-1"
                  style={{ fontFamily: 'Permanent Marker, cursive' }}
                >
                  aka "{politician.nickname}"
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Generate button */}
        <motion.div
          className="text-center px-4 py-4 md:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={generateRoast}
            disabled={!selectedPolitician || isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-8 md:px-12 py-4 md:py-5 text-xl md:text-2xl font-bold border-4 border-[#FFE135] min-h-[60px] ${
              !selectedPolitician
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-600'
                : 'bg-[#FFE135] text-black hover:bg-[#FF1493] hover:text-white hover:border-white cursor-pointer'
            }`}
            style={{ fontFamily: 'Bangers, cursive' }}
          >
            {isGenerating ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ROASTING...
              </motion.span>
            ) : (
              <>GENERATE ROAST</>
            )}
          </motion.button>
        </motion.div>

        {/* Meme output area */}
        <AnimatePresence mode="wait">
          {(currentRoast || isGenerating) && (
            <motion.section
              key={currentRoast?.punchline || 'generating'}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="px-4 py-4 md:py-8 flex-1 flex items-start justify-center"
            >
              <div className="w-full max-w-2xl">
                {/* Tabloid card */}
                <div
                  className="relative bg-white p-1"
                  style={{
                    transform: 'rotate(-1deg)',
                    boxShadow: '0 25px 50px -12px rgba(255, 20, 147, 0.3), 0 0 0 4px #FFE135'
                  }}
                >
                  {/* Red banner */}
                  <div className="bg-red-600 text-white py-2 px-3 md:px-4 text-center">
                    <span
                      className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em]"
                      style={{ fontFamily: 'Courier Prime, monospace' }}
                    >
                      THE NANOBANANAPRO TIMES
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-[#FFFEF0] p-4 md:p-6">
                    {isGenerating ? (
                      <div className="text-center py-8 md:py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="text-5xl md:text-6xl inline-block"
                        >
                          🍌
                        </motion.div>
                        <p
                          className="text-black text-lg md:text-xl mt-4"
                          style={{ fontFamily: 'Permanent Marker, cursive' }}
                        >
                          Peeling the truth...
                        </p>
                      </div>
                    ) : currentRoast && (
                      <>
                        {/* Headline */}
                        <div
                          className="text-2xl sm:text-3xl md:text-4xl text-black leading-tight mb-4"
                          style={{ fontFamily: 'Bangers, cursive' }}
                        >
                          {currentRoast.setup}
                        </div>

                        {/* Punchline */}
                        <div
                          className="text-lg md:text-xl text-[#FF1493] leading-snug"
                          style={{ fontFamily: 'Permanent Marker, cursive' }}
                        >
                          {currentRoast.punchline}
                        </div>

                        {/* Banana mascot quote */}
                        <div className="mt-4 md:mt-6 pt-4 border-t-2 border-dashed border-gray-300">
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-2xl md:text-3xl">🍌</span>
                            <p
                              className="text-gray-600 text-xs md:text-sm italic"
                              style={{ fontFamily: 'Courier Prime, monospace' }}
                            >
                              {bananaQuote}
                            </p>
                          </div>
                        </div>

                        {/* Target indicator */}
                        <div className="mt-4 text-center">
                          <span className="inline-block bg-black text-[#FFE135] px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm">
                            TARGET: {selectedPolitician?.name.toUpperCase()} {selectedPolitician?.emoji}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty state when no roast */}
        {!currentRoast && !isGenerating && (
          <motion.div
            className="flex-1 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center">
              <motion.div
                className="text-6xl md:text-8xl mb-4"
                animate={{
                  rotate: [-10, 10, -10],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🍌
              </motion.div>
              <p
                className="text-white/60 text-lg md:text-xl"
                style={{ fontFamily: 'Permanent Marker, cursive' }}
              >
                Pick a politician to roast!
              </p>
            </div>
          </motion.div>
        )}

        {/* Floating decorative elements */}
        <div className="fixed top-20 left-4 md:left-10 text-3xl md:text-4xl opacity-20 pointer-events-none animate-bounce hidden sm:block">🍌</div>
        <div className="fixed bottom-32 right-4 md:right-10 text-3xl md:text-4xl opacity-20 pointer-events-none animate-pulse hidden sm:block">🔥</div>
        <div className="fixed top-40 right-4 md:right-20 text-3xl md:text-4xl opacity-10 pointer-events-none hidden sm:block" style={{ animation: 'spin 10s linear infinite' }}>💀</div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-4 md:py-6 text-center">
        <p
          className="text-white/30 text-xs"
          style={{ fontFamily: 'Courier Prime, monospace' }}
        >
          Requested by @web-user · Built by @clonkbot
        </p>
      </footer>

      {/* CSS for spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
