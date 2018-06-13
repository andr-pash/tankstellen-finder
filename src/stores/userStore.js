import { EventEmitter } from "events";

class UserStore extends EventEmitter {
    constructor() {
        super()
        this.user = null
    }

    setUser(user) {
        this.user = user
        this.emit('change')
    }
}

export const userStore = new UserStore()