import logo from './logo.png';
import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    localSalesCount: '',
    foreignSalesCount: '',
    averageSaleAmount: ''
  });

  const [results, setResults] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  setResults(null);

    try {
      const response = await fetch("https://localhost:5000/Commision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          LocalSalesCount: Number(formData.localSalesCount),
          ForeignSalesCount: Number(formData.foreignSalesCount),
          AverageSaleAmount: Number(formData.averageSaleAmount),
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || "Backend returned an error");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      setResults({
        avalphaLocalCommission: data.avalphaLocalCommission ?? 0,
        avalphaForeignCommission: data.avalphaForeignCommission ?? 0,
        avalphaTotalCommission: data.avalphaTotalCommission ?? 0,
        competitorLocalCommission: data.competitorLocalCommission ?? 0,
        competitorForeignCommission: data.competitorForeignCommission ?? 0,
        competitorTotalCommission: data.competitorTotalCommission ?? 0,
      });

      } catch (err) {
        setError("Error connecting to backend");
      } finally {
        setIsLoading(false);
      }
    };


  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="Avalpha Technologies Logo" />
          <h1 className="company-title">Avalpha Technologies</h1>
          <h2 className="app-subtitle">Commission Calculator</h2>
        </div>
      </header>

      <main className="main-content">
        <div className="calculator-container">
          <div className="form-section">
            <h3>Sales Information</h3>
            <form onSubmit={handleSubmit} className="calculator-form">
              <div className="form-group">
                <label htmlFor="localSalesCount">Local Sales Count</label>
                <input
                  type="number"
                  id="localSalesCount"
                  name="localSalesCount"
                  value={formData.localSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of local sales"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="foreignSalesCount">Foreign Sales Count</label>
                <input
                  type="number"
                  id="foreignSalesCount"
                  name="foreignSalesCount"
                  value={formData.foreignSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of foreign sales"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="averageSaleAmount">Average Sale Amount (£)</label>
                <input
                  type="number"
                  step="0.01"
                  id="averageSaleAmount"
                  name="averageSaleAmount"
                  value={formData.averageSaleAmount}
                  onChange={handleInputChange}
                  placeholder="Enter average sale amount"
                  required
                />
              </div>

              <button
                type="submit"
                className={`calculate-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Calculating...' : 'Calculate Commission'}
              </button>
            </form>

            {error && <p className="error-text">{error}</p>}
          </div>

          {results && (
            <div className="results-section">
              <h3>Commission Results</h3>
              <div className="results-grid">
                <div className="result-card avalpha-card">
                  <div className="result-header">
                    <h4>Avalpha Technologies</h4>
                    <span className="commission-rates">Local: 20% | Foreign: 35%</span>
                  </div>
                  <div className="result-amount">
                    <p>Local = £{results.avalphaLocalCommission?.toFixed(2) ?? '0.00'}</p>
                    <p>Foreign = £{results.avalphaForeignCommission?.toFixed(2) ?? '0.00'}</p>
                    <p>Total = £{results.avalphaTotalCommission?.toFixed(2) ?? '0.00'}</p>
                  </div>
                </div>

                <div className="result-card competitor-card">
                  <div className="result-header">
                    <h4>Competitor</h4>
                    <span className="commission-rates">Local: 2% | Foreign: 7.55%</span>
                  </div>
                  <div className="result-amount">
                    <p>Local = £{results.competitorLocalCommission?.toFixed(2) ?? '0.00'}</p>
                    <p>Foreign = £{results.competitorForeignCommission?.toFixed(2) ?? '0.00'}</p>
                    <p>Total = £{results.competitorTotalCommission?.toFixed(2) ?? '0.00'}</p>
                  </div>
                </div>
              </div>

              {results.avalphaTotalCommission > 0 && (
                <div className="advantage-indicator">
                  <p className="advantage-text">
                    Avalpha Technologies advantage: 
                    <strong> £{(results.avalphaTotalCommission - results.competitorTotalCommission).toFixed(2)}</strong>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Avalpha Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
