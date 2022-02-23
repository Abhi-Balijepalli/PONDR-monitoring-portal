# Pondr Monitoring Portal
#### Authors: Abhi Balijepalli, Ibrahim Saeed

## Copyright: 
This software and it's content is a copyright of © Pondr. Any redistributions or reproduction of part of all of the contents in any form is prohibited other than the following: 
- You may clone the repo and modify for personal non-profit and/or non-commercial projects, as long as you acknowledge the software and repo as the source of the material.
- If you want to use the code for commercial or profit use, please contact abhibalijepalli@gmail.com



`az acr build --image thanos --registry arthurcourtreg .`    

`az webapp config container set --name thanos-portal --resource-group msft-production --docker-custom-image-name arthurcourtreg.azurecr.io/thanos --docker-registry-server-url https://arthurcourtreg.azurecr.io`
