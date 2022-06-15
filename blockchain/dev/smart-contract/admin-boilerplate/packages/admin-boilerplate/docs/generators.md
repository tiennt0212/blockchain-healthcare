# Generator of admin boilerplate

Generating command **`yarn generate`**.

- **component** is view only react-component. They may have their own state.
- **container** is a component that may consist of other components. They can connect to the redux store.
- **modelPage** is a page with a given model. It has common features of an admin page which are list available data, update, and create a new record.

### Important note in `model-spec.json` file

When you generate a model page, this project will use the `model-spec.json` file to generate a model based on the `collectionName` which you chose. 

In the `attributes` property of the model that you generated, it has some values that need to be noted.

<details>
<summary> Expand to examples</summary>

```shell
"attributes": {
  "name": {
    "type": "string",
    "show": true,
    "create": true,
    "edit": true
  },
  "image": {
    "model": "file",
    "via": "related",
    "allowedTypes": [
      "images",
      "files",
      "videos"
    ],
    "displayField": "name",
    "show": true,
    "create": true,
    "edit": true
  },
  "images": {
    "collection": "file",
    "via": "related",
    "allowedTypes": [
      "images",
      "files",
      "videos"
    ],
    "displayField": "name",
    "show": true,
    "create": true,
    "edit": true
  },
  "category": {
    "model": "category",
    "displayField": "name",
    "show": false,
    "create": true,
    "edit": true
  },
  "products": {
    "collection": "product",
    "attribute": "product",
    "column": "id",
    "isVirtual": true,
    "displayField": "name",
    "show": false,
    "create": true,
    "edit": true
  },
}
```
</details>


## Model integration with code logic

- **`show`** *(boolean)*: 
  - `true`, this attribute will be used to display on the table list and **can** be filter
  - `false`, it will be hidden and cannot be filterd
  
- **`create`** *(boolean)*:
  - `true`, this attribute will be allowed to display on the Create Form. In other words, the attributes that have `"create": true` are the inputs when creating an object.
  - `false`, it will not be displayed on the Create Form.
  
- **`edit`** *(boolean)*:
  - `true`, this attribute will be allowed to display on the Edit Form. In other words, the attributes that have `"edit": true` are the fields that can be edit.
  - `false`, it will not be displayed on the Edit Form
  
- **`model`** *(string)*:
  - `"model": "file"`, it will be used for Single Upload File
  - Otherwise, `"model": <collectionName>` (e.g `"model": "category"`) will be a **one to one** relationship corresponding to the `collectionName`.

- **`collection`** *(string)*:
  - `"collection": "file"`, it will be used for Multiple Upload Files
  - Otherwise, `"collection": <collectionName>` (e.g `"collection": "product"`) will be a **one to many** relationship corresponding to the `collectionName`.

- **`allowedType`** *(array)*: Data types of file uploads are allowed.

- **`displayField`** *(string)*: Used to display the collectionName property of one to one and one to many relationships on tableList, filter, create and edit. (e.g `"collection": "product"` => `"displayField": "name"`)

# Redo

A tip for restore what we changed by using git.

```bash
git restore public src/server src/utils src/Routes.jsx && git clean -fd
```


