'use strict'

/*
|--------------------------------------------------------------------------
| Redis Subscribers
|--------------------------------------------------------------------------
|
| Here you can register the subscribers to redis channels. Adonis assumes
| your listeners are stored inside `app/Listeners` directory.
|
*/

const Redis = use('Redis')

/**
* Inline subscriber
*/
Redis.subscribe('categories', async (track) => {
	console.log('received categories track', track)
})

/**
 * Binding method from a module saved inside `app/Listeners/News`
 */
// Redis.subcribe('news', 'News.onMessage')
