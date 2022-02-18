'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">desafio-dev documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' : 'data-target="#xs-controllers-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' :
                                            'id="xs-controllers-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' : 'data-target="#xs-injectables-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' :
                                        'id="xs-injectables-links-module-AccountModule-2a1065d77d891ddbb120bd809e73a2e0008de4406bc100ae01cb50a0725d892e64559d9dc6f5c1d7fd1d68ff7c94d7e65c9ece8acddbab55f15c77d38dd333b0"' }>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CompanyModule.html" data-type="entity-link" >CompanyModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CompanyModule-f5720ca04b32aa21fd2d33dd10995a4510c4e8a8ea1cbd997a19a74a483b2fd2f60809a92efec368390cc4eb3f99efd6626627a1440756dfbe6b31197e2cd8c2"' : 'data-target="#xs-injectables-links-module-CompanyModule-f5720ca04b32aa21fd2d33dd10995a4510c4e8a8ea1cbd997a19a74a483b2fd2f60809a92efec368390cc4eb3f99efd6626627a1440756dfbe6b31197e2cd8c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompanyModule-f5720ca04b32aa21fd2d33dd10995a4510c4e8a8ea1cbd997a19a74a483b2fd2f60809a92efec368390cc4eb3f99efd6626627a1440756dfbe6b31197e2cd8c2"' :
                                        'id="xs-injectables-links-module-CompanyModule-f5720ca04b32aa21fd2d33dd10995a4510c4e8a8ea1cbd997a19a74a483b2fd2f60809a92efec368390cc4eb3f99efd6626627a1440756dfbe6b31197e2cd8c2"' }>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersonModule.html" data-type="entity-link" >PersonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PersonModule-664adb8120dbd9e6dc012c01b68a0977a68cc6f6f2bda37ef197fccff2d99e278cc06b466a97391e0f6624fcc1e869043d3f3ed6843119ed412a090679951c49"' : 'data-target="#xs-injectables-links-module-PersonModule-664adb8120dbd9e6dc012c01b68a0977a68cc6f6f2bda37ef197fccff2d99e278cc06b466a97391e0f6624fcc1e869043d3f3ed6843119ed412a090679951c49"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersonModule-664adb8120dbd9e6dc012c01b68a0977a68cc6f6f2bda37ef197fccff2d99e278cc06b466a97391e0f6624fcc1e869043d3f3ed6843119ed412a090679951c49"' :
                                        'id="xs-injectables-links-module-PersonModule-664adb8120dbd9e6dc012c01b68a0977a68cc6f6f2bda37ef197fccff2d99e278cc06b466a97391e0f6624fcc1e869043d3f3ed6843119ed412a090679951c49"' }>
                                        <li class="link">
                                            <a href="injectables/PersonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionModule.html" data-type="entity-link" >TransactionModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransactionModule-04da309e7e8fccef2fb3f717d3d1cf38eb46c19dfda8ab995dbb744a162e6a21892d98b1a8d7a910c193a8b749faa237b6fc6ed16d096ffb14d02089b9411546"' : 'data-target="#xs-injectables-links-module-TransactionModule-04da309e7e8fccef2fb3f717d3d1cf38eb46c19dfda8ab995dbb744a162e6a21892d98b1a8d7a910c193a8b749faa237b6fc6ed16d096ffb14d02089b9411546"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionModule-04da309e7e8fccef2fb3f717d3d1cf38eb46c19dfda8ab995dbb744a162e6a21892d98b1a8d7a910c193a8b749faa237b6fc6ed16d096ffb14d02089b9411546"' :
                                        'id="xs-injectables-links-module-TransactionModule-04da309e7e8fccef2fb3f717d3d1cf38eb46c19dfda8ab995dbb744a162e6a21892d98b1a8d7a910c193a8b749faa237b6fc6ed16d096ffb14d02089b9411546"' }>
                                        <li class="link">
                                            <a href="injectables/TransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiResponse.html" data-type="entity-link" >ApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpResponse.html" data-type="entity-link" >HttpResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Person.html" data-type="entity-link" >Person</a>
                            </li>
                            <li class="link">
                                <a href="classes/Transaction.html" data-type="entity-link" >Transaction</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAccount.html" data-type="entity-link" >IAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccountData.html" data-type="entity-link" >IAccountData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICompany.html" data-type="entity-link" >ICompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPerson.html" data-type="entity-link" >IPerson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITransaction.html" data-type="entity-link" >ITransaction</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});