import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
	collections: [
		{
			label: 'WTF Notes',
			name: 'notes',
			path: '_notes',
			templates: [
				{
					label: 'Note',
					name: 'note',
					fields: [
						{
							type: 'text',
							label: 'Title',
							name: 'title',
						},
						{
							type: 'text',
							label: 'Slug',
							name: 'slug',
						},
						{
							type: 'group',
							label: 'Terms',
							name: 'terms',
						},
						{
							type: 'date',
							label: 'Created',
							name: 'created',
						},
						{
							type: 'date',
							label: 'Modified',
							name: 'modified',
						},
						{
							type: 'date',
							label: 'Time',
							name: 'time',
						},
					],
				},
			],
		},
	],
})
