import React, { useState, useEffect } from 'react'
import { ArrowUpDown, TrendingUp, Shield, Zap, BarChart3, Wallet, RefreshCw } from 'lucide-react'

interface ExchangeRate {
  rate: number
  change24h: number
  lastUpdated: string
}

function App() {
  const [xrpAmount, setXrpAmount] = useState<string>('')
  const [btcAmount, setBtcAmount] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({
    rate: 0.000016,
    change24h: 2.34,
    lastUpdated: new Date().toLocaleTimeString()
  })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'trade' | 'portfolio' | 'history'>('trade')

  // Simulate real-time rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setExchangeRate(prev => ({
        ...prev,
        rate: prev.rate * (1 + (Math.random() - 0.5) * 0.02),
        change24h: prev.change24h + (Math.random() - 0.5) * 0.5,
        lastUpdated: new Date().toLocaleTimeString()
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleXrpChange = (value: string) => {
    setXrpAmount(value)
    if (value && !isNaN(Number(value))) {
      setBtcAmount((Number(value) * exchangeRate.rate).toFixed(8))
    } else {
      setBtcAmount('')
    }
  }

  const handleBtcChange = (value: string) => {
    setBtcAmount(value)
    if (value && !isNaN(Number(value))) {
      setXrpAmount((Number(value) / exchangeRate.rate).toFixed(2))
    } else {
      setXrpAmount('')
    }
  }

  const handleSwap = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Simulate successful trade
      alert('Trade executed successfully!')
    }, 2000)
  }

  const formatNumber = (num: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ArrowUpDown className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">CryptoSwap</h1>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('trade')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'trade'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Trade
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'history'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                History
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'trade' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trading Interface */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Swap Crypto</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <RefreshCw className="w-4 h-4" />
                    <span>Last updated: {exchangeRate.lastUpdated}</span>
                  </div>
                </div>

                {/* From Currency */}
                <div className="space-y-6">
                  <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium text-gray-300">From</label>
                      <span className="text-sm text-gray-400">Balance: 1,250.00 XRP</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=40&h=40&fit=crop&crop=center"
                          alt="XRP"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-white">XRP</div>
                          <div className="text-sm text-gray-400">Ripple</div>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={xrpAmount}
                        onChange={(e) => handleXrpChange(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent text-right text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <button className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <ArrowUpDown className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {/* To Currency */}
                  <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium text-gray-300">To</label>
                      <span className="text-sm text-gray-400">Balance: 0.05432 BTC</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=40&h=40&fit=crop&crop=center"
                          alt="Bitcoin"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-white">BTC</div>
                          <div className="text-sm text-gray-400">Bitcoin</div>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={btcAmount}
                        onChange={(e) => handleBtcChange(e.target.value)}
                        placeholder="0.00000000"
                        className="flex-1 bg-transparent text-right text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Exchange Rate Info */}
                  <div className="bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-xl p-4 border border-orange-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Exchange Rate</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">
                          1 XRP = {formatNumber(exchangeRate.rate, 8)} BTC
                        </div>
                        <div className={`text-sm flex items-center ${
                          exchangeRate.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {exchangeRate.change24h >= 0 ? '+' : ''}{formatNumber(exchangeRate.change24h)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Swap Button */}
                  <button
                    onClick={handleSwap}
                    disabled={!xrpAmount || !btcAmount || isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <ArrowUpDown className="w-5 h-5" />
                        <span>Swap Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Market Stats */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Market Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">XRP Price</span>
                    <span className="text-white font-semibold">$0.52</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">BTC Price</span>
                    <span className="text-white font-semibold">$43,250</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">24h Volume</span>
                    <span className="text-white font-semibold">$2.1B</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Why Choose Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Secure Trading</div>
                      <div className="text-sm text-gray-400">Bank-level security</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Instant Swaps</div>
                      <div className="text-sm text-gray-400">Lightning fast execution</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Best Rates</div>
                      <div className="text-sm text-gray-400">Competitive pricing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Wallet className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Your Portfolio</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=40&h=40&fit=crop&crop=center"
                      alt="XRP"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white font-semibold">XRP</span>
                  </div>
                  <span className="text-green-400 text-sm">+2.34%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">1,250.00</div>
                <div className="text-gray-400">≈ $650.00</div>
              </div>

              <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=40&h=40&fit=crop&crop=center"
                      alt="Bitcoin"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white font-semibold">BTC</span>
                  </div>
                  <span className="text-green-400 text-sm">+1.87%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">0.05432</div>
                <div className="text-gray-400">≈ $2,348.50</div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-xl p-6 border border-orange-500/30">
                <div className="text-sm text-gray-300 mb-2">Total Portfolio Value</div>
                <div className="text-3xl font-bold text-white mb-1">$2,998.50</div>
                <div className="text-green-400 text-sm">+$45.23 (1.53%)</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-8">Transaction History</h2>
            
            <div className="space-y-4">
              {[
                { type: 'Swap', from: 'XRP', to: 'BTC', amount: '500.00', value: '$260.00', time: '2 hours ago', status: 'Completed' },
                { type: 'Swap', from: 'BTC', to: 'XRP', amount: '0.01', value: '$432.50', time: '1 day ago', status: 'Completed' },
                { type: 'Swap', from: 'XRP', to: 'BTC', amount: '750.00', value: '$390.00', time: '3 days ago', status: 'Completed' },
              ].map((tx, index) => (
                <div key={index} className="bg-black/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                        <ArrowUpDown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {tx.type}: {tx.amount} {tx.from} → {tx.to}
                        </div>
                        <div className="text-gray-400 text-sm">{tx.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{tx.value}</div>
                      <div className="text-green-400 text-sm">{tx.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
