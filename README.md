# 🧌 Mock Off

A JSON mock data builder whether you’re prototyping, testing, or just mocking around
Mock Off helps you generate and shape JSON structures with live preview, type inference,
exporting to a .json file or direct to clipboard.

---

## Features

- 🔁 Quick tabbed input 
- 🧩 Unique Key validation
- 🧠 Supports **type inference** for values and arrays
- 💾 One-click **export or copy** of generated `.json` with total item count

---

## ✨ Up Coming Features ✨

- 🧬 Nested objects
- 🧌 Mock object generation
- 📂 Drag and drop .json for mock generation

## 📦 Getting Started

```bash
git clone https://github.com/PittsGitHub/MockOff.git
cd MockOff
npm install
npm run dev
```

## Example Input & Output
Quick input:
input key => **tab** => input value => **tab** => **enter key** => input key 🔁

![mockOff](https://github.com/user-attachments/assets/5273c5d7-44b2-461d-9fe4-977cc2182902)

```
[
  {
    "totalItemCount": 1,
    "items": [
      {
        "id": 1,
        "name": "Bilbo",
        "dog": true,
        "age": 4.55,
        "naughty": false,
        "fineBoy": true,
        "daysSinceLastBork": -1.5
      }
    ]
  }
]
```
