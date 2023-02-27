# Website

> **Warning**
> Do not contribute to this project. Do not file pull requests or issues.

This entire project is Work-In-Progress and currently nowhere near completion.
Further documentation and information will follow once it's completed.

---

This is a Monorepository, meaning that all parts of this project are hosted in
the same repo.

  * `/client` is the front-end, a React app
  * `/server` contains the back-end
    * `/server/store` is the server and API for the store, a Vendure app

## 💻 Installing

First, install the client's dependencies

```
npm i --prefix client
```

And then the store server's dependencies

```
yarn --cwd server/store install
```

Lastly, install this monorepo's dependenncies

```
npm i
```

## 🛠️ Running

Make sure to locally set up a database server beforehand. More info about this
is in the [store server readme](./server/store/README.md).

If you're all set up, you can finally run the website like this:

```
npm run dev
```

You can also run all parts seperately

```
npm run dev:frontend  # Web client
npm run dev:store     # Store server
```

## 📜 License

All code in this repository is licensed under the GNU Affero General Public
License v3.0 or later. If you've never heard of it,
[here](https://www.gnu.org/licenses/why-affero-gpl.html) is some info on it.

[See the license](./LICENSE)
