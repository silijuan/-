#!/bin/sh


if [ -d $BUILD_KIT_PATH/nodejs/nodejs-0.12.4/bin ]
then
    export PATH=$BUILD_KIT_PATH/nodejs/nodejs-0.12.4/bin:$PATH
fi

echo "build start"

if [ -d "output" ]

then
    rm -rf output
fi

echo '============ npm start ============='


npm install --registry=http://registry.npm.baidu.com/

# node --harmony ./node_modules/webpack/bin/webpack.js $1 
npm run build

mkdir -p output

mv dist/ mis/

tar czf mis.tar.gz mis/*

mv mis.tar.gz output/

cd output
md5sum mis.tar.gz > mis.tar.gz.md5
