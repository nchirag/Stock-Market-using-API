from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/stock/<symbol>', methods=['GET'])
def get_stock_data(symbol):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    if not start_date or not end_date:
        return jsonify({'error': 'Missing start_date or end_date'}), 400

    try:
        print(f"Fetching stock data for {symbol} from {start_date} to {end_date}")

        stock = yf.Ticker(symbol)
        hist = stock.history(start=start_date, end=end_date)

        if hist.empty:
            return jsonify({'error': 'No stock data found for the given date range'}), 404

        data = hist[['Open', 'Close', 'High', 'Low']].reset_index()
        response = data.to_dict(orient='records')

        return jsonify(response)

    except Exception as e:
        print(f"Error: {str(e)}")  # Print error message in terminal
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
