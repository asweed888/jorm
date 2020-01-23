import { Record, Records } from './type'

export module jorm {
    export class Open {
        private db: any = {}
        constructor(dbinit: any) {
            this.db = dbinit
        }

        public Register(recordsName: string, records: any): Records{
            try {
                this.db[recordsName] = records
            } catch (error) {
                console.error(error.message)
            }
            return this.Find(recordsName)
        }

        public Create(recordsName: string, newRecord: Record): Records {
            try {
                this.db[recordsName].push(newRecord)
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(recordsName)
        }

        public Update(recordsName: string, targetRecord: Record): Records {
            const id = targetRecord.id
            let record = targetRecord
            delete record.id

            try {
                for (const idb in this.db[recordsName]) {
                    if (this.db[recordsName][idb].id != id) continue
                    for (const krec in record) {
                        this.db[recordsName][idb][krec] = record[krec]
                    }
                }
            } catch (error) {
                console.error(error.message)
            }

            
            return this.Find(recordsName)
        }

        public Delete(recordsName: string, targetRecord: Record): Records{
            const id = targetRecord.id
            try {
                for (const idb in this.db[recordsName]) {
                    if (this.db[recordsName][idb].id != id) continue
                    this.db[recordsName].splice(idb, 1)
                }
            } catch (error) {
                console.error(error.message)
            }

            return this.Find(recordsName)
        }


        public Find(recordsName: string): Records {
            let records: Records = []
            try {
                records = this.db[recordsName]
            } catch (error) {
                console.error(error.message)
            }

            return records
        }

    }
}
