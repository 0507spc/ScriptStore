

# Setup
- This script does require some setup, while it should be possible to implement all this in Scriptable now, starting off I did the refresh token externally. Until any improvements this is what I have here.

- The first step is to get a developer account from Monzo: https://developers.monzo.com
You will need an App for this, details are as follows:
1. Login to the developer portal
1. Click the link in the email and accept the authorisation in you Monzo app
1. Go to clients and create a new client. The Python GitHub below gives more details of what is needed, mostly it is just read access.
1. You will need the following:
..1. clientID
..1. UserID
..1. AccoutnID
..1. clientSecret
..1. MONZO_ACCESS_TOKEN
..1. MONZO_REFRESH_TOKEN
1. We will need to store these in a config folder in Scriptable in json - Monzo.json, example is included
1. If you have a joint account, you can run the script in normal or joint mode (will need JointID too)

1. Once you have these, you will need to clone the following: https://github.com/jyaffe/monzo.git
1. In this, all we need is to edit the config.py, fill in the details at the top: MONZO_CLIENT_ID, MONZO_CLIENT_SECRET
1. Run the main.py: python3.8 main.py
1. Follow the instructions (they are comprehensive), an error at the end is fine, config.py should now have a token and refresh token at the bottom. Copy these into you Monzo.json
1. That's it, it should work, joint accounts sleep for 5 to ensure no contention between running personal / joint lookups


# Author: 
- cranie
# Link:
- https://github.com/0507spc/ScriptStore/blob/main/Widgets/Monzo/BankDetails.js
# Version:
- 1.0
# Description:
- This script displays the last several transactions (limited merchant ID) currently not showing dates or daily totals.
# Screenshot:
![Large Widget](https://github.com/0507spc/ScriptStore/blob/main/Widgets/Monzo/Small.jpg?raw=true)
# View Code:
- https://github.com/0507spc/ScriptStore/blob/main/Widgets/Monzo/BankDetails.js
