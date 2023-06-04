from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather')
def weather():
    city = request.args.get('city')
    if not city:
        return jsonify(error='City parameter is missing.')
    
    api_key = '96b8469f471f332787a2e7eda3460a98'  # Replace with your OpenWeatherMap API key
    url = f"api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=96b8469f471f332787a2e7eda3460a98"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        weather_description = data['weather'][0]['description']
        temperature = data['main']['temp']
        humidity = data['main']['humidity']
        wind_speed = data['wind']['speed']

        return jsonify({
            'description': weather_description,
            'temperature': temperature,
            'humidity': humidity,
            'wind_speed': wind_speed
        })
    except requests.exceptions.HTTPError as e:
        return jsonify(error=str(e))
    except KeyError:
        return jsonify(error='Weather data not found.')
    except Exception as e:
        return jsonify(error='An error occurred.')

if __name__ == '__main__':
    app.run()