"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jorm;
(function (jorm) {
    class Open {
        constructor(dbinit) {
            this.db = {};
            this.db = dbinit;
        }
        Regist(collectionName, newCollection) {
            try {
                this.db[collectionName] = newCollection;
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(collectionName);
        }
        Create(collectionName, newDoc) {
            try {
                this.db[collectionName].push(newDoc);
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(collectionName);
        }
        Update(collectionName, targetDoc) {
            const id = targetDoc.id;
            let doc = targetDoc;
            delete doc.id;
            try {
                for (const idb in this.db[collectionName]) {
                    if (this.db[collectionName][idb].id != id)
                        continue;
                    for (const kdoc in doc) {
                        this.db[collectionName][idb][kdoc] = doc[kdoc];
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(collectionName);
        }
        Delete(collectionName, targetDoc) {
            const id = targetDoc.id;
            try {
                for (const idb in this.db[collectionName]) {
                    if (this.db[collectionName][idb].id != id)
                        continue;
                    this.db[collectionName].splice(idb, 1);
                }
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(collectionName);
        }
        Find(collectionName) {
            let collection = [];
            try {
                collection = this.db[collectionName];
            }
            catch (error) {
                console.error(error.message);
            }
            return collection;
        }
        Show() {
            console.dir(this.db);
        }
    }
    jorm.Open = Open;
})(jorm = exports.jorm || (exports.jorm = {}));
