export const options =  {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MedTrack CRUD REST API", 
            version: "1.0.0",
            description: "This API allows CRUD operations for managing a Pharmacy and Laboratory Inventory implemented with Express and documented using Swagger ",
        }, 
        servers: [
            {
                url: "http://localhost:9090",
                description: "Development server"
            },
            {
                url: "https://medtrack-restapi.onrender.com/api",
                description: "Production server"
            }
        ],
        tags: [
            {
                name: "Pharmacy",
                description: "Endpoints for managing Pharmarcy Inventory"
            },
            {
                name: "Laboratory",
                description: "Endpoints for managing Laboratory Inventory"
            }
        ], 
        paths: {
            "/api/drug": {
                // Define GET, POST, PATCH, DELETE operations for /api/drug endpoint
                get: {
                    summary: "Retrieves all drugs in inventory",
                    tags: ["Drugs"],
                    responses: {
                        201: {
                            description: "Successful Operation",
                            content: {
                                "application/json":{
                                    schema:{
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Drug" },
                                    }
                                }
                            }
      
                        }, 
                        
                    }
                },

                post: {
                    summary: "Upload a new drug to inventory",
    tags: ["Drugs"], 
    requestBody: {
      required: true,
      content: {
        "application/json":{
          schema:{
            type: "object",
            properties: {
              drugName: {
                type: "string",
                description: "Name of the drug"
              },
              description: {
                type: "string",
                description: "Description of the drug"
              },
              unitPrice: {
                type: "string",
                description: "Unit price of the drug"
              },
              code: {
                type: "string",
                description: "Code of the drug"
              },
              price: {
                type: "integer",
                description: "Price of the drug"
              }
            }
          }
        }
      }
    },
                    responses: {
                        201: {
                            description: "Drug uploaded successfully"
                        },
                        400:{
                            description: "Bad request - ensure correct data was provided"
                        },
                        409:{
                            description: "Drug already exists- check the drug code"
                        }
                    }
                }
            },
            "/api/drug/{id}": {
                // Define PATCH and DELETE operations for /api/drug/{id} endpoint
                patch: {
                    summary: "Update a drug",
                    tags: ["Drugs"],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the drug to update/edit",
                            required: true,
                            schema: {
                                type: "string",
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Drug",
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Drug updated successfully"
                        },
                        400:{
                            description: "Bad request - ensure correct data was provided"
                        },
                        409:{
                            description: "Drug already exists- check the drug code"
                        }
      
                    }
                },
                delete: {
                    summary: "Delete a drug",
                    tags: ["Drugs"],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the drug to delete",
                            schema: {
                                type: "string",
                            }
                        }
                    ],
      
                    responses: {
                        201: {
                            description: "Drug deleted successfully"
                        },
                        400:{
                            description: "Bad request - ensure correct data was provided"
                        },
                       
                    }
      
                },
            },
            "/api/lab": {
                // Define GET, POST, PATCH, DELETE operations for /api/lab endpoint

                get: {
                    summary: "Retrieves all Lab Items in inventory",
                    tags: ["Labs"],
                    responses: {
                        200: {
                            description: "Successful Operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Lab"}
                                    }
                                }
                            }
                        }
                    }
                }, 
  
                post: {
                    summary: "Upload a new Lab item",
                    tags: ["Labs"],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Labs",
                                }
                            }
                        }
                    }
                },

                post: {
                    summary: "Upload a new drug to inventory",
    tags: ["Labs"], 
    requestBody: {
      required: true,
      content: {
        "application/json":{
          schema:{
            type: "object",
            properties: {
              labItem: {
                type: "string",
                description: "Lab Item Name"
              },
              labType: {
                type: "string",
                description: "Lab Item Type"
              },
              category: {
                type: "string",
                description: "Main category of Lab item"
              },
              subCategory: {
                type: "string",
                description: "Sub category of Lab item"
              },
              code: {
                type: "string",
                description: "Code of the Lab item"
              },
              price: {
                type: "integer",
                description: "Price of the Lab item"
              }
            }
          }
        }
      }
    },
                    responses: {
                        201: {
                            description: "Lab Item uploaded successfully"
                        },
                        400:{
                            description: "Bad request - ensure correct data was provided"
                        },
                        409:{
                            description: "Lab item already exists- check the Lab code"
                        }
                    }
                }
            },
            "/api/lab/{id}": {
                // Define PATCH and DELETE operations for /api/lab/{id} endpoint

                patch: {
                    summary: "Update a Lab item",
                    tags: ["Labs"],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "Id of the Lab item to update/edit",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Lab",
                                }
                            }
                        }
                    }, 
                    responses: {
                        201: {
                            description: "Lab Item updated successfully"
                        },
                        400:{
                            description: "Bad request - ensure correct data was provided"
                        },
                        409:{
                            description: "Lab item already exists- check the Lab code"
                        }
                    }
                },
      
                delete: {
                    summary: "Delete a Lab item",
                    tags: ["Labs"],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "Id of the Lab item to delete",
                            required: true,
                            schema: {
                                type: "string",
                            }
                        }
                    ],
                    responses: {
                        201: {
                            description: "Lab Item deleted successfully"
                        },
                        400:{
                            description: "Bad request - ensure correct data was provided"
                        },
                        
                    }
                }
            }
        },
        components: {
            schemas: {
                Drug: {
                    // Define properties for Drug schema

                    type: "object",
                    required: [
                        "drugName",
                        "description",
                        "unitPrice",
                        "code",
                        "price"
                    ],
                    properties: {
                        drugName: {
                            type: "string",
                            description: "Name of the Drug"
                        },
                        description: {
                            type: "string",
                            description: "description of the Drug"
                        },
                        unitPrice: {
                            type: "string",
                            description: "Unit of pricing of the Drug"
                        },
                        code: {
                            type: "string",
                            description: "Code of the Drug"
                        },
                        price: {
                            type: "integer",
                            description: "Price of the Drug"
                        }
      
                    }
                },
                Lab: {
                    // Define properties for Lab schema

                    type: "object",
                    required: [
                        "labItem",
                        "labType",
                        "category",
                        "subCategory",
                        "code",
                        "price"
                        
                ], 
                properties: {
                    labItem: {
                        type: "string",
                        description: "Name of Lab Item"
                    },
                    labType: {
                        type: "string",
                        description: "Lab Type"
                    },
                    category: {
                        type: "string",
                        description: "Main category of the Lab"
                    },
                    subCategory: {
                        type: "string",
                        description: "Sub category of the Lab"
                    },
                    code: {
                        type: "string",
                        description: "Code of Lab Item"
                    },
                    price: {
                        type: "integer",
                        description: "Price of Lab Item"
                    }
                }
                }
            },
            responses: {
                400: {
                    description: "Bad request - make sure you provide the correct data",
                    contents: "application/json",
                },
                403: {
                    description: "Already exist - add a different item",
                    contents: "application/json",
                },
                201: {
                    description: "Added Successfully",
                    contents: "application/json",
                },
                200: {
                    description: "Successful Operation",
                    contents: "application/json",
                },
            }
        }
    },
    apis: ["../routes/*.js"],
};
