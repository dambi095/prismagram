/* 
모든 파일들을 schema.js 에서 합친다. api 폴더 안에 아주 많은 grapql 파일들이 추가될 것이고, 같은 위치에 resolvers 파일들이 추가될 것 ~
서버에는 schema.js 파일 하나만 입력해주면 끝! 단 서버에는 typeDefs 와 resolvers 가 모두 입력 되어야 한다!
*/

import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

// api 폴더 밑의 모든 폴더에 속해있고, .graphql or .js 로 끝나는 모든 파일들을 가져올 거야 
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({ 
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;