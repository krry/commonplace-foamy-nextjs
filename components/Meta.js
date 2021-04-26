import Head from 'next/head'
import config from '../site.config'

const Meta = () => {
	return (
		<Head>
			{/* thanks to https://favycon.app/ for these */}
			<link rel='apple-touch-icon' sizes='57x57' href='/favicons/favicon-57x57.png' />
			<link rel='apple-touch-icon' sizes='60x60' href='/favicons/favicon-60x60.png' />
			<link rel='apple-touch-icon' sizes='72x72' href='/favicons/favicon-72x72.png' />
			<link rel='apple-touch-icon' sizes='76x76' href='/favicons/favicon-76x76.png' />
			<link rel='apple-touch-icon' sizes='114x114' href='/favicons/favicon-114x114.png' />
			<link rel='apple-touch-icon' sizes='120x120' href='/favicons/favicon-120x120.png' />
			<link rel='apple-touch-icon' sizes='144x144' href='/favicons/favicon-144x144.png' />
			<link rel='apple-touch-icon' sizes='152x152' href='/favicons/favicon-152x152.png' />
			<link rel='apple-touch-icon' sizes='180x180' href='/favicons/favicon-180x180.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='96x96' href='/favicons/favicon-96x96.png' />
			<link rel='icon' type='image/png' sizes='192x192' href='/favicons/favicon-192x192.png' />
			<link rel='shortcut icon' type='image/x-icon' href='/favicons/favicon.ico' />
			<link rel='icon' type='image/x-icon' href='/favicons/favicon.ico' />
			<meta name='msapplication-TileColor' content='#1F9E9E' />
			<meta name='msapplication-TileImage' content='/favicons/favicon-144x144.png' />
			<meta name='msapplication-config' content='/favicons/browserconfig.xml' />
			<link rel='manifest' href='/favicons/manifest.json' />
			<meta name='theme-color' content='#1F9E9E' />{' '}
			<link rel='alternate' type='application/rss+xml' href='/favicons/feed.xml' />
			<meta property='og:image' content={config.OG_IMAGE_URL} />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='author' content={config.site.author} />
			<meta name='description' content={config.site.description} />
			<title>{config.site.title}</title>
		</Head>
	)
}

export default Meta
