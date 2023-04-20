# Simple Memo (ver1.5)

You can check out the app on [vercel](https://simple-memo-hapc4dpml-seiya-tagami.vercel.app/)＼(-o-)／

## Preview

### pc layout (light theme)

<img src="https://user-images.githubusercontent.com/107479598/233389181-b8908749-aaaa-41e7-9673-ac17e70e2011.png"/>

### mobile layout (dark theme)

<img src="https://user-images.githubusercontent.com/107479598/233389973-5a48438f-bb67-42f4-8417-5a6c8ad67917.png" height="600"/>

1. [About](#About)
1. [Getting started](#Getting%20started)
1. [Languages and Tools](#Languages%20and%20Tools)
1. [Dev history](#Dev%20history)
1. [License](#License)

## About

Simple memo makes your life better, more intuitive and productive.  
With Simple Memo, you can create, update, read and delete a memo (what is called "CRUD" Operations).  
Also, this product has a no database and instead, I use a localStorage to accumulate memo data.

## Getting started

```
npm install
```

```
npm run dev
```

## Languages and Tools

This product uses the following things:

- Vue.js
- TypeScript
- Pinia
- Tailwind CSS
- Vite
- Font Awesome
- flaticon

## Dev history

- **version1.0, released on 2023/03/30**  
  In the first version, I built basic functions of Simple Memo, such as CRUD Operations. Also, it does not connect to any Databases and instead, I used the localStorage.

- **version1.1, released on 2023/04/04**  
  In the version 1.1, I improved whole of the application UI, but specifically, I worked hard to review MemoItem's UI and made it better. Also, I introduced "dark-theme-mode", which would let your experience more exciting!

- **version1.2, released on 2023/04/06**  
  In the version1.2, I introduced Pinia, which is a store library for Vue and made the code clear. Also, I conducted code refactoring.

- **version1.3, released on 2023/04/08**  
  In the version1.3, I revised the UI and modified it. Also, I you can add favorite website URL to your memo!

- **version1.4, released on 2023/04/11**  
  In the version1.4, again, I revised the whole of the UI and fix some parts. Also, I remade UI which functions as "create" and "update".

- **version1.5, released on 2023/04/20**  
  In the version1.5, I added a category and filtering function, which makes this application more simple.

## License

[MIT](https://choosealicense.com/licenses/mit/)
