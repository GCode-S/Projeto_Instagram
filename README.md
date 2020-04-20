# Projeto Instagram
Aplicação imitada do Instagram criada com node.js, react.js e react-native.

Para a utilização do aplicativo siga as instruções.


/backend/index.js

config -> 

        -entre no site mongodb.com  e crie um registro.
        -crie uma clusters.
        -copie a url e subtitua no treixo de código 'sua url'.
        {
            mongoose.connect('sua url', {
                useNewUrlParser: true, useUnifiedTopology: true
            });
        }

        -entre na pasta backend e rode no prompt "yarn dev" (sem as aspas).


/frontend/src/services/api.js 

config ->

        -entre em um novo prompt e digite "ipconfig" (sem as aspas).
        -copie seu endereço de ip e subtitua pela palavra "seuIp".
        {
            const api = axios.create({
                baseURL: 'http://seuIp:3333',
            });
        }
        
	     -repita o processo em /frontend/src/pages/Feed/index.js na variável socket
   	   -repita o processo em /mobile/src/pages/Feed/index.js na variável socket
       -repita o processo em /mobile/src/services/api.js
 
