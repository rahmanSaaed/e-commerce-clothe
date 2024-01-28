import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
	providedIn: 'root'
})
export class SessionStorageService {

	constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

	set(key: string, value: any) {
		this.storage.set(key, value)
	}

	get(key: string) {
		return this.storage.get(key)
	}
}
