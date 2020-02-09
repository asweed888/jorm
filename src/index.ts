import { Doc, Collection } from './type'

export module jorm {
    export class Open {
        private db: any = {}
        constructor(dbinit: any) {
            this.db = dbinit
        }

        public Regist(collectionName: string, newCollection: any): Collection {
            try {
                this.db[collectionName] = newCollection
            } catch (error) {
                console.error(error.message)
            }
            return this.Find(collectionName)
        }

        public Create(collectionName: string, newDoc: Doc): Collection {
            try {
                this.db[collectionName].push(newDoc)
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(collectionName)
        }

        public Update(collectionName: string, targetDoc: Doc): Collection {
            const id = targetDoc.id
            let doc = targetDoc
            delete doc.id

            try {
                for (const idb in this.db[collectionName]) {
                    if (this.db[collectionName][idb].id != id) continue
                    for (const kdoc in doc) {
                        this.db[collectionName][idb][kdoc] = doc[kdoc]
                    }
                }
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(collectionName)
        }

        public Delete(collectionName: string, targetDoc: Doc): Collection {
            const id = targetDoc.id
            try {
                for (const idb in this.db[collectionName]) {
                    if (this.db[collectionName][idb].id != id) continue
                    this.db[collectionName].splice(idb, 1)
                }
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(collectionName)
        }

        public Find(collectionName: string): Collection {
            let collection: Collection = []
            try {
                collection = this.db[collectionName]
            } catch (error) {
                console.error(error.message)
            }

            return collection
        }
    }
}
