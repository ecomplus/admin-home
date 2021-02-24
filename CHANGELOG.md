# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0-rc.0](https://github.com/ecomplus/admin-home/compare/v0.9.4...v1.1.0-rc.0) (2021-02-24)


### Features

* **ec-onboarding:** setup onboarding card with timeline and video ([#5](https://github.com/ecomplus/admin-home/issues/5)) ([19bc331](https://github.com/ecomplus/admin-home/commit/19bc3316ec676908c71236e7b05541f6b1ea1626))


### Bug Fixes

* **deps:** update all non-major dependencies to ^2.6.12 ([#3](https://github.com/ecomplus/admin-home/issues/3)) ([185ec33](https://github.com/ecomplus/admin-home/commit/185ec3337fe5606d28c830b5c6cc4e94573eda5a))
* **ec-buyers-profile:** handling buyers with gender not configured (optional) ([3113fa9](https://github.com/ecomplus/admin-home/commit/3113fa9746694707e624807533e180c1045fdc73))

### [0.9.4](https://github.com/ecomplus/admin-home/compare/v0.9.3...v0.9.4) (2021-02-23)


### Features

* **ec-buyers-profile-chart:** setup new buyers profile graphs card ([68e2445](https://github.com/ecomplus/admin-home/commit/68e244508e66d6ab768f10595519ecdac3f6da9f))
* **ec-orders-graphs:** add pie chart with orders pass rate ([1983ef2](https://github.com/ecomplus/admin-home/commit/1983ef27c42959ba2572848502bdeb43d536b72b))


### Bug Fixes

* **ec-home:** load home cards when no period orders count (skip graphs) ([098da22](https://github.com/ecomplus/admin-home/commit/098da223187a528e6e8b94e9d2fcd0dc49b14232))
* **ec-home:** show picture icon when no logo set ([1e84cc9](https://github.com/ecomplus/admin-home/commit/1e84cc95b225965cd65ab27913695be1dea62a59))
* **ec-payment-methods-chart:** group by payemnt method name, legend first chart ([23f624e](https://github.com/ecomplus/admin-home/commit/23f624e5f98acefdad92a325aed989688752ee47))

### [0.9.3](https://github.com/ecomplus/admin-home/compare/v0.9.2...v0.9.3) (2021-02-21)


### Features

* **ec-home:** add useful links on head free space ([7f927bb](https://github.com/ecomplus/admin-home/commit/7f927bb76578129c81b305263b1f9853f06d0e8e))
* **ec-home:** showing both paid and total period amount ([beaae40](https://github.com/ecomplus/admin-home/commit/beaae40dbc35f943ee5b5a7b6e8f7dfd9d5d2dfb))


### Bug Fixes

* **deps:** update @ecomplus/admin-helpers to v1.2.4 ([6dcb782](https://github.com/ecomplus/admin-home/commit/6dcb782afe08bffbef486b3493362abf87d88f23))

### [0.9.2](https://github.com/ecomplus/admin-home/compare/v0.9.1...v0.9.2) (2021-02-12)


### Bug Fixes

* **layout:** minor fixes for xl devices view ([d71db69](https://github.com/ecomplus/admin-home/commit/d71db69d0c573276435af0c7d83a886450359fc6))

### [0.9.1](https://github.com/ecomplus/admin-home/compare/v0.9.0...v0.9.1) (2021-02-12)

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
