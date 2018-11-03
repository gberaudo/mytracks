# API

## Installation

- Create venv

```
apt-get install python3-venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt 

```


- Setup postgresql

```
sudo apt-get install postgresql
sudo -u postgres createdb mytracks
sudo -u postgres psql mytracks <<EOF
create user mytracksuser with PASSWORD 'XXXXX';
grant all on DATABASE mytracks to mytracksuser;
EOF

```

- Activate venv

```
source .venv/bin/activate
```
