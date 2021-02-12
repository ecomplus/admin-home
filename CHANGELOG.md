# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.9.0 (2021-02-12)


### Features

* **ec-dates-picker:** setup date range picker for metrics filtering ([66ec7a7](https://github.com/ecomplus/admin-home/commit/66ec7a747a144763af070dc16a7045c09d7aa4de))
* **ec-dates-picker:** store chosen date range and get back from localStorage ([ea9a710](https://github.com/ecomplus/admin-home/commit/ea9a710ad7e70d60a85dc5dade610d44568ccef5))
* **ec-home:** finish handling domain save (udate store) ([3069a9f](https://github.com/ecomplus/admin-home/commit/3069a9f9d15f6ded0c2f263842df891ea1c25216))
* **ec-home:** first (fixed) card with store main info and share (todo) ([b98336d](https://github.com/ecomplus/admin-home/commit/b98336d55d5a171986f181b890dc057617e599d5))
* **ec-home:** handle selected periods, compare with same days past period ([14814fa](https://github.com/ecomplus/admin-home/commit/14814fa6df6418a8f48d8165598c75382d4f0bdc))
* **ec-home:** load and render order metrics with share buttons ([2839ce7](https://github.com/ecomplus/admin-home/commit/2839ce7dfc3a9e533c104ca76c48bf5bb3dd8e62))
* **ec-home:** loading and transition effects, layout edits ([51dcfad](https://github.com/ecomplus/admin-home/commit/51dcfad4a15f5dac326d6af95d0d5d258c4a0f84))
* **ec-home:** markup/style improves, setup date range selector ([3bdd895](https://github.com/ecomplus/admin-home/commit/3bdd895dffa4702410b302940bae55d83ab13f61))
* **ec-home:** showing storefront edit and home link ([9166550](https://github.com/ecomplus/admin-home/commit/91665500c182c94dd31f2cd3a0a16d418c7770b5))
* **ec-orders-graphs:** date reactive mixed graph with order numbers/amount ([d768c3f](https://github.com/ecomplus/admin-home/commit/d768c3f8029e9ef9dbe5f8f4571327485a9b962e))
* **ec-orders-graphs:** setup components and fetch 30 days orders data ([e9a87f4](https://github.com/ecomplus/admin-home/commit/e9a87f42489e0231e2e3aba5b08197df1146837c))
* **ec-orders-list:** setup orders list card (first one) ([d916cd1](https://github.com/ecomplus/admin-home/commit/d916cd1dc217bc585050e03ca144e840ac0a49a1))
* **ec-payment-methods-graph:** setup new payment methods graph card ([6d2d520](https://github.com/ecomplus/admin-home/commit/6d2d520ccc1da4aa5c9214569eb54fcf4d86f1e7))
* **ec-products-list:** setup new products list (sort by sales) card ([b597474](https://github.com/ecomplus/admin-home/commit/b597474eef5a94478a819b3d6e783614bf36b491))
* **setup:** initialize bv plugins and start with @ecomplus/auth ([966a15f](https://github.com/ecomplus/admin-home/commit/966a15f58bd4aae3fef42661f137c4bbe201197a))


### Bug Fixes

* **deps:** remove vuex (not used) ([6bf3008](https://github.com/ecomplus/admin-home/commit/6bf300852601e74ffcbaad14160384330e6764e1))
* **deps:** update @ecomplus/auth to v1.0.0-rc.6 ([01dcae2](https://github.com/ecomplus/admin-home/commit/01dcae2ffdf4bbcd9e8d402f989f05f3acd87e37))
* **deps:** update all non-major dependencies ([a62fe8b](https://github.com/ecomplus/admin-home/commit/a62fe8b731fc5b5748b77e681208ce3e25ed9b11))
* **ec-dates-picker:** minor component api fix (prop type) ([49c8b6e](https://github.com/ecomplus/admin-home/commit/49c8b6e6f93e9f7ce5fa99dbbfb8a70a42055c91))
* **ec-dates-picker:** parse stored iso dates to date object ([344d7d2](https://github.com/ecomplus/admin-home/commit/344d7d24aaea888135aac66ea7b83dd9832283d7))
* **ec-home:** minor fixes handling date range changes and loading states ([fb96a3a](https://github.com/ecomplus/admin-home/commit/fb96a3a87b9a8097d0f801cfe59ad1f85f735c96))
* **ec-home:** reset loading states on date range change ([de9de6d](https://github.com/ecomplus/admin-home/commit/de9de6d423b2b9fa5431368f1df49c668ca83a33))
* **ec-orders-list:** minor table content fix (responsiveness) ([5306c91](https://github.com/ecomplus/admin-home/commit/5306c919faee22cfbd3e49759a1a56c96180fb5b))
* fix EcOrdersGraphs.js filename ([f889af9](https://github.com/ecomplus/admin-home/commit/f889af9c65f194719e86595944d783c4e6a45a9e))
* **setup:** separate css from setup module file ([f54e76f](https://github.com/ecomplus/admin-home/commit/f54e76f8800a78176df7886263125db6d0588ac3))