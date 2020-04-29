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

        public Create(collectionName: string, newDoc: Doc, addPosition: string | number = 'end'): Collection {
            try {
                if(addPosition == 'end'){
                    this.db[collectionName].push(newDoc)
                } else if(addPosition == 'start'){
                    this.db[collectionName].unshift(newDoc)
                } else if(typeof addPosition == 'number'){
                    this.db[collectionName].splice(addPosition, 0, newDoc)
                }
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(collectionName)
        }

        public Update(collectionName: string, targetDoc: Doc): Collection {
            const id = targetDoc.id
            const doc_json = JSON.stringify(targetDoc)
            const doc = JSON.parse(doc_json)
            delete doc.id

            try {
                for (const i in this.db[collectionName]) {
                    if (this.db[collectionName][i].id != id) continue
                    for (const docKey in doc) {
                        this.db[collectionName][i][docKey] = doc[docKey]
                    }
                }
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(collectionName)
        }

        public Delete(collectionName: string, targetDoc: Doc): Collection {
            try {
                for (const i in this.db[collectionName]) {
                    if (this.db[collectionName][i].id != targetDoc.id) continue
                    this.db[collectionName].splice(i, 1)
                }
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(collectionName)
        }

        public Find(collectionName: string, targetDoc:Doc = null): Collection {
            let collection: Collection = []
            try {
                if (targetDoc){
                    for (const i in this.db[collectionName]) {
                        if (this.db[collectionName][i].id != targetDoc.id) {
                            continue
                        }
                        else{
                            collection.push(this.db[collectionName][i])
                            break
                        }
                    }
                }
                else{
                    collection = this.db[collectionName]
                }
            } catch (error) {
                console.error(error.message)
            }

            return collection
        }

        public Show(): void {
            console.dir(this.db)
        }
    }
}
