```shell
npm install -g @angular/cli

# init project
export NG_PROJECT_NAME=fp-ui
ng new --inline-style --prefix=fp --routing --ssr=false --style=scss $NG_PROJECT_NAME
cd $NG_PROJECT_NAME
ng generate environments

# tailwindcss
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
cat <<EOF > tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF
cat <<EOF >> src/styles.scss
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# angular-material
ng add @angular/material --skip-confirmation --theme=indigo-pink --typography --animations=enabled

# eslint
ng add @angular-eslint/schematics --skip-confirmation

# npm packages
npm install oidc-client-ts
# optional packages
# ngx-mqtt ace-builds js-yaml marked mermaid ngx-echarts reveal.js

# dev dependencies
# npm install --save-dev @types/reveal.js

# for mobile
# @capacitor/android @capacitor/angular @capacitor/app @capacitor/browser @capacitor/core @capacitor/ios
```
