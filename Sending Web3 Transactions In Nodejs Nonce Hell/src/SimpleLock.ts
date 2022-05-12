const lockStore = new Map();

class SimpleLock {
  waiting: ((_:unknown) => void)[] = [];
  taken = false;

    acquire() {
        return new Promise(resolve => {
            if (!this.taken) {
                this.taken = true;
                resolve("");
                return;
            }
            this.waiting.push(resolve);
        });
    }

    release() {
        if (!this.taken) {
            return;
        }
        if (this.waiting.length > 0) {
            const resolve = this.waiting.shift()!;
            resolve("");
        } else {
            this.taken = false;
        }
    }
}

const createLock: (name: string) => SimpleLock = (name) => {
    if (name) {
        let lock = lockStore.get(name);
        if (!lock) {
            lockStore.set(name, (lock = new SimpleLock()));
        }
        return lock;
    }
    return new SimpleLock();
}

export default createLock;
