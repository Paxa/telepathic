rm -rf build
mkdir -p build
cp -r ./scripts ./build
cp -r ./fruits ./build

curl http://localhost:4567/ > build/index.html
curl http://localhost:4567/style.sass.css > build/style.sass.css