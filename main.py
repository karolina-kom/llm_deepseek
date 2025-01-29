import requests
import json

url = "http://localhost:11434/api/generate"
headers = {
    'Content-Type': 'application/json',
}
conversation_history = []

while True:
    print('Code with Deepseek Coder:')
    user_input = input("You: ")
    if user_input.lower() in ["quit", "exit"]:
        print("Exiting conversation.")
        break

    conversation_history.append(user_input)
    full_prompt = "\n".join(conversation_history)
    data = {
        "model": "deepseek-coder",
        "stream": False,
        "prompt": full_prompt,
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))
    if response.status_code == 200:
        response_data = response.json()
        ai_response = response_data["response"]
        print("AI:", ai_response)
        conversation_history.append(ai_response)
    else:
        print(f"Error: {response.status_code} - {response.text}")
