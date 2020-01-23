"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jorm;
(function (jorm) {
    class Open {
        constructor(dbinit) {
            this.db = {};
            this.db = dbinit;
        }
        Register(recordsName, records) {
            try {
                this.db[recordsName] = records;
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(recordsName);
        }
        Create(recordsName, newRecord) {
            try {
                this.db[recordsName].push(newRecord);
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(recordsName);
        }
        Update(recordsName, targetRecord) {
            const id = targetRecord.id;
            let record = targetRecord;
            delete record.id;
            try {
                for (const idb in this.db[recordsName]) {
                    if (this.db[recordsName][idb].id != id)
                        continue;
                    for (const krec in record) {
                        this.db[recordsName][idb][krec] = record[krec];
                    }
                }
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(recordsName);
        }
        Delete(recordsName, targetRecord) {
            const id = targetRecord.id;
            try {
                for (const idb in this.db[recordsName]) {
                    if (this.db[recordsName][idb].id != id)
                        continue;
                    this.db[recordsName].splice(idb, 1);
                }
            }
            catch (error) {
                console.error(error.message);
            }
            return this.Find(recordsName);
        }
        Find(recordsName) {
            let records = [];
            try {
                records = this.db[recordsName];
            }
            catch (error) {
                console.error(error.message);
            }
            return records;
        }
    }
    jorm.Open = Open;
})(jorm = exports.jorm || (exports.jorm = {}));
