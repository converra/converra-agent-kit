import os
from openai import OpenAI
from converra import Converra

converra = Converra(api_key=os.environ['CONVERRA_API_KEY'])
client = converra.wrap(OpenAI(), prompt_id='support-agent')
# Running this calls a model and uploads a captured run. Obtain authority first.
response = client.chat.completions.create(
    model='gpt-4o-mini',
    messages=[{'role': 'user', 'content': 'How can I contact support?'}],
)
print(response.choices[0].message.content)
