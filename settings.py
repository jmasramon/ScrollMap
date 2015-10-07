MONGO_HOST = 'mongodb.qumram-demo.ch'
MONGO_PORT = 27017
# MONGO_USERNAME = 'user'
# MONGO_PASSWORD = 'user'
# MONGO_DBNAME = 'apitest'
# MONGO_DBNAME = 'qumram-demo-tracking'
MONGO_DBNAME = 'qumram-demo'

# # Enable reads (GET), inserts (POST) and DELETE for resources/collections
# # (if you omit this line, the API will default to ['GET'] and provide
# # read-only access to the endpoint).
# RESOURCE_METHODS = ['GET', 'POST', 'DELETE']

# # Enable reads (GET), edits (PATCH), replacements (PUT) and deletes of
# # individual items  (defaults to read-only item access).
# ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']




# schema = {
#     # Schema definition, based on Cerberus grammar. Check the Cerberus project
#     # (https://github.com/nicolaiarocci/cerberus) for details.
#     'firstname': {
#         'type': 'string',
#         'minlength': 1,
#         'maxlength': 10,
#     },
#     'lastname': {
#         'type': 'string',
#         'minlength': 1,
#         'maxlength': 15,
#         'required': True,
#         # talk about hard constraints! For the purpose of the demo
#         # 'lastname' is an API entry-point, so we need it to be unique.
#         'unique': True,
#     },
#     # 'role' is a list, and can only contain values from 'allowed'.
#     'role': {
#         'type': 'list',
#         'allowed': ["author", "contributor", "copy"],
#     },
#     # An embedded 'strongly-typed' dictionary.
#     'location': {
#         'type': 'dict',
#         'schema': {
#             'address': {'type': 'string'},
#             'city': {'type': 'string'}
#         },
#     },
#     'born': {
#         'type': 'datetime',
#     },
# }

# people = {
#     # 'title' tag used in item links. Defaults to the resource title minus
#     # the final, plural 's' (works fine in most cases but not for 'people')
#     'item_title': 'person',

#     # by default the standard item entry point is defined as
#     # '/people/<ObjectId>'. We leave it untouched, and we also enable an
#     # additional read-only entry point. This way consumers can also perform
#     # GET requests at '/people/<lastname>'.
#     'additional_lookup': {
#         'url': 'regex("[\w]+")',
#         'field': 'lastname'
#     },

#     # We choose to override global cache-control directives for this resource.
#     'cache_control': 'max-age=10,must-revalidate',
#     'cache_expires': 10,

#     # most global settings can be overridden at resource level
#     'resource_methods': ['GET', 'POST'],

#     'schema': schema
# }

tokenStore_schema = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/nicolaiarocci/cerberus) for details.
    '_id': {
        'type': 'string',
    },
    's': {
        'type': 'float',
    },
    'f': {
        'type': 'integer',
    },
    'fr': {
        'type': 'boolean',
    },
    'u': {
        'type': 'string',
    },
}

tokenStore = {
    # 'title' tag used in item links. Defaults to the resource title minus
    # the final, plural 's' (works fine in most cases but not for 'people')
    'item_title': 'token',

    # by default the standard item entry point is defined as
    # '/people/<ObjectId>'. We leave it untouched, and we also enable an
    # additional read-only entry point. This way consumers can also perform
    # GET requests at '/people/<lastname>'.
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'fr'
    },

    # We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],

    'schema': tokenStore_schema
}

packetStore_schema = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/nicolaiarocci/cerberus) for details.
    '_id': {
        'type': 'string',
   	},
    'headers': {
        'type': 'dict',
        'schema': {
            'token': {'type': 'string'},
            'timestamp': {'type': 'float'},
            'diffed': {'type': 'boolean'},
            'compressed': {'type': 'boolean'},
            'sequence_number': {'type': 'integer'},
        },
     },
    'labels': {'type': 'list'},
    'body': {
        'type': 'dict',
        'schema': {
            'meta': {'type': 'list'},
            'html': {'type': 'string'}
        },
    },
    # 'b': {
    #     'type': 'dict',
    #     'schema': {
    #         'm': {'type': 'list'},
    #     },
    # },
    # 'h': {
    #     'type': 'dict',
    #     'schema': {
    #         't': {'type': 'string'},
    #         's': {'type': 'float'},
    #         'd': {'type': 'boolean'},
    #         'c': {'type': 'boolean'},
    #         'sequence_number': {'type': 'integer'},
    #     },
    # },
}

packetStore = {
    # 'title' tag used in item links. Defaults to the resource title minus
    # the final, plural 's' (works fine in most cases but not for 'people')
    'item_title': 'token',

    # by default the standard item entry point is defined as
    # '/people/<ObjectId>'. We leave it untouched, and we also enable an
    # additional read-only entry point. This way consumers can also perform
    # GET requests at '/people/<lastname>'.
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'body'
    },

    # We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],

    'schema': packetStore_schema
}

archivedObjects_schema = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/nicolaiarocci/cerberus) for details.
   "_id" : {
        'type': 'string',
	},
    "tenantId" : {
        'type': 'string',
	},
    "mode" : {
        'type': 'integer',
	},
    "type" : {
        'type': 'integer',
	},
    "language" : {
        'type': 'string',
	},
    "captureTime" : {
        'type': 'datetime',
	},
    "request" : {
        'type': 'dict',
        'schema': {
	        "waId" : {
	        	'type': 'string',
			},
	        "url" : {
	        	'type': 'string',
			},
	        "method" : {
	        	'type': 'string',
			},
	        "headers" : {
		        'type': 'dict',
		        'schema': {
		            "Host" : {
			        	'type': 'string',
					},
			        "Connection" : {
			        	'type': 'string',
					},
		            "Accept" : {
			        	'type': 'string',
					},
		            "User-Agent" : {
			        	'type': 'string',
					},
		            "DNT" : {
			        	'type': 'string',
					},
		            "Referer" : {
			        	'type': 'string',
					},
		            "Accept-Encoding" : {
			        	'type': 'string',
					},
		            "Accept-Language" : {
			        	'type': 'string',
					},
		            "Cookie" : {
			        	'type': 'string',
					},
				}
			}
        },
        "bodyContentId" : {
        	'type': 'string',
		},
    },
    "response" : {
        'type': 'dict',
        'schema': {
	        "title" : {
	        	'type': 'string',
			},
	        "statusCode" : {
	        	'type': 'integer',
			},
	        "bodyContentId" : {
	        	'type': 'string',
			},
	        "headers" : {
		        'type': 'dict',
		        'schema': {
		            "Date" : {
			        	'type': 'string',
					},
		            "Server" : {
			        	'type': 'string',
					},
		            "Content-Type" : {
			        	'type': 'string',
					},
		            "Last-Modified" : {
			        	'type': 'string',
					},
		            "ETag" : {
			        	'type': 'string',
					},
		            "Accept-Ranges" : {
			        	'type': 'string',
					},
		            "Content-Length" : {
			        	'type': 'string',
					},
				}
	        }
    	}
    },
    "metaData" : {
    	'type': 'string',
	},
    "trackingToken" : {
    	'type': 'string',
	},
    "sessionId" : {
    	'type': 'string',
	},
    "versionId" : {
    	'type': 'string',
	},
}

archivedObjects = {
    # 'title' tag used in item links. Defaults to the resource title minus
    # the final, plural 's' (works fine in most cases but not for 'people')
    'item_title': 'token',

    # by default the standard item entry point is defined as
    # '/people/<ObjectId>'. We leave it untouched, and we also enable an
    # additional read-only entry point. This way consumers can also perform
    # GET requests at '/people/<lastname>'.
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'tenantId'
    },

    # We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],

    'schema': archivedObjects_schema
}

sessions_schema = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/nicolaiarocci/cerberus) for details.
    '_id': {
        'type': 'string',
	},
	'externalSessionId': {
	    'type': 'string',
	},
	'start': {
	    'type': 'datetime',
	},
	'end': {
	    'type': 'datetime',
	},
	'tenantId': {
	    'type': 'string',
	},
	'userId': {
	    'type': 'string',
	},
	'sessionStepIds': {
	    'type': 'list',
	},
}

sessions = {
    # 'title' tag used in item links. Defaults to the resource title minus
    # the final, plural 's' (works fine in most cases but not for 'people')
    'item_title': 'token',

    # by default the standard item entry point is defined as
    # '/people/<ObjectId>'. We leave it untouched, and we also enable an
    # additional read-only entry point. This way consumers can also perform
    # GET requests at '/people/<lastname>'.
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'externalSessionId'
    },

    # We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,

    # most global settings can be overridden at resource level
    'resource_methods': ['GET'],

    'schema': sessions_schema
}

DOMAIN = {
    # 'people': people,
    'tokenStore': tokenStore,
    'packetStore': packetStore,
    'archivedObjects': archivedObjects,
    'sessions': sessions
}


