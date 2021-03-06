jQuery(
	function( $ ) {
		var fileNameElement  = $( '#file-name' );
		var merchantsElement = $( '#wppfm-merchants-selector' );
		var countriesElement = $( '#wppfm-countries-selector' );
		var level0Element    = $( '#lvl_0' );

		// monitor the four main feed settings and react when they change
		fileNameElement.on(
			'focusout',
			function() {
				if ( '' !== fileNameElement.val() ) {
					countriesElement.prop( 'disabled', false );
					level0Element.prop( 'disabled', false );
					if ( false === wppfm_validateFileName( fileNameElement.val() ) ) {
						fileNameElement.val( '' );
					}

					if ( '0' !== merchantsElement.val() ) {
						wppfm_showChannelInputs( merchantsElement.val(), true );
						wppfm_mainInputChanged( false );
					} else {
						wppfm_hideFeedFormMainInputs();
					}
				} else {
					countriesElement.prop( 'disabled', true );
					level0Element.prop( 'disabled', true );
				}
			}
		);

		fileNameElement.on(
			'keyup',
			function() {

				if ( '' !== fileNameElement.val() ) {
					countriesElement.prop( 'disabled', false );
					level0Element.prop( 'disabled', false );
				} else {
					countriesElement.prop( 'disabled', true );
					level0Element.prop( 'disabled', true );
				}
			}
		);

		countriesElement.on(
			'change',
			function() {
				if ( '0' !== countriesElement.val() ) {
					level0Element.prop( 'disabled', false );
				}

				wppfm_mainInputChanged( false );
			}
		);

		$( '#wppfm-feed-language-selector' ).on(
			'change',
			function() {
				wppfm_setGoogleFeedLanguage( jQuery( '#wppfm-feed-language-selector' ).val() );

				if ( wppfm_requiresLanguageInput ) {
					wppfm_mainInputChanged( false );
				}
			}
		);

		$( '#wppfm-feed-currency-selector' ).on(
			'change',
			function() {
				wppfm_setGoogleFeedCurrency( jQuery( '#wppfm-feed-currency-selector' ).val() );
			}
		);

		$( '#google-feed-title-selector' ).on(
			'change',
			function() {
				wppfm_setGoogleFeedTitle( jQuery( '#google-feed-title-selector' ).val() );
			}
		);

		$( '#google-feed-description-selector' ).on(
			'change',
			function() {
				wppfm_setGoogleFeedDescription( jQuery( '#google-feed-description-selector' ).val() );
			}
		);

		merchantsElement.on(
			'change',
			function() {
				if ( '0' !== merchantsElement.val() && '' !== $( '#file-name' ).val() ) {
					wppfm_showChannelInputs( $( '#wppfm-merchants-selector' ).val(), true );
					wppfm_mainInputChanged( false );
				} else {
					wppfm_hideFeedFormMainInputs();
				}
			}
		);

		$( '#variations' ).on(
			'change',
			function() {
				wppfm_variation_selection_changed();
			}
		);

		$( '#aggregator' ).on(
			'change',
			function() {
				wppfm_aggregatorChanged();
				wppfm_drawAttributeMappingSection(); // reset the attribute mapping
			}
		);

		level0Element.on(
			'change',
			function() {
				wppfm_mainInputChanged( true );
			}
		);

		$( '.wppfm-cat-selector' ).on(
			'change',
			function() {
				wppfm_nextCategory( this.id );
			}
		);

		$( '#wppfm-generate-feed-button-top' ).on(
			'click',
			function() {
				wppfm_generateFeed();
			}
		);

		$( '#wppfm-generate-feed-button-bottom' ).on(
			'click',
			function() {
				wppfm_generateFeed();
			}
		);

		$( '#wppfm-save-feed-button-top' ).on(
			'click',
			function() {
				wppfm_saveFeedData();
			}
		);

		$( '#wppfm-view-feed-button-top' ).on(
			'click',
			function() {
				wppfm_viewFeed( $( '#wppfm-feed-url' ).text() );
			}
		);

		$( '#wppfm-view-feed-button-bottom' ).on(
			'click',
			function() {
				wppfm_viewFeed( $( '#wppfm-feed-url' ).text() );
			}
		);

		$( '#wppfm-save-feed-button-bottom' ).on(
			'click',
			function() {
				wppfm_saveFeedData();
			}
		);

		$( '#days-interval' ).on(
			'change',
			function() {
				wppfm_saveUpdateSchedule();
			}
		);

		$( '#update-schedule-hours' ).on(
			'change',
			function() {
				wppfm_saveUpdateSchedule();
			}
		);

		$( '#update-schedule-minutes' ).on(
			'change',
			function() {
				wppfm_saveUpdateSchedule();
			}
		);

		$( '#update-schedule-frequency' ).on(
			'change',
			function() {
				wppfm_saveUpdateSchedule();
			}
		);

		$( '#wppfm_auto_feed_fix_mode' ).on(
			'change',
			function() {
				wppfm_auto_feed_fix_changed();
			}
		);

		$( '#wppfm_background_processing_mode' ).on(
			'change',
			function() {
				wppfm_clear_feed_process();
				wppfm_background_processing_mode_changed();
			}
		);

		$( '#wppfm_process_logging_mode' ).on(
			'change',
			function() {
				wppfm_feed_logger_status_changed();
			}
		);

		$( '#wppfm_product_identifiers' ).on(
			'change',
			function() {
				wppfm_show_product_identifiers_changed();
			}
		);

		$( '#wppfm_wpml_use_full_resolution_urls' ).on(
			'change',
			function() {
				wppfm_wpml_use_full_resolution_urls_changed();
			}
		)

		$( '#wppfm_third_party_attr_keys' ).on(
			'focusout',
			function() {
				wppfm_third_party_attributes_changed();
			}
		);

		$( '#wppfm_notice_mailaddress' ).on(
			'focusout',
			function() {
				wppfm_notice_mailaddress_changed();
			}
		);

		$( '#wppfm-clear-feed-process-button' ).on(
			'click',
			function() {
				wppfm_clear_feed_process();
			}
		);

		$( '#wppfm-reinitiate-plugin-button' ).on(
			'click',
			function() {
				wppfm_reinitiate();
			}
		);

		$( '.wppfm-category-mapping-selector' ).on( // on activation of a category selector in the Category Mapping table
			'change',
			function() {
				if ( $( this ).is( ':checked' ) ) {
					console.log( 'category ' + $( this ).val() + ' selected' );
					wppfm_activateFeedCategoryMapping( $( this ).val() );
				} else {
					console.log( 'category ' + $( this ).val() + ' deselected' );
					wppfm_deactivateFeedCategoryMapping( $( this ).val() );
				}
			}
		);

		$( '.wppfm-category-selector' ).on( // on activation of a category selector in the Category Selector table
			'change',
			function() {
				if ( $( this ).is( ':checked' ) ) {
					console.log( 'category ' + $( this ).val() + ' selected' );
					wppfm_activateFeedCategorySelection( $( this ).val() );
				} else {
					console.log( 'category ' + $( this ).val() + ' deselected' );
					wppfm_deactivateFeedCategorySelection( $( this ).val() );
				}
			}
		);

		$( '#wppfm-categories-select-all' ).on( // on activation of the 'all' selector in the Category Mapping and Category Selector table
			'change',
			function() {
				if ( $( this ).is( ':checked' ) ) {
					wppfm_activateAllFeedCategoryMapping();
				} else {
					wppfm_deactivateAllFeedCategoryMapping();
				}
			}
		);

		$( '#wppfm_accept_eula' ).on(
			'change',
			function() {
				if ( $( this ).is( ':checked' ) ) {
					$( '#wppfm_license_activate' ).prop( 'disabled', false );
				} else {
					$( '#wppfm_license_activate' ).prop( 'disabled', true );
				}
			}
		);

		//$( '.edit-output' ).click( function () { wppfm_editOutput( this.id ); } ); TODO: Check this out later. The this.id should get the id of the link but it doesn't.

		$( '#wppfm_prepare_backup' ).on(
			'click',
			function() {
				$( '#wppfm_backup-file-name' ).val( '' );
				$( '#wppfm_backup-wrapper' ).show();
			}
		);

		$( '#wppfm_make_backup' ).on(
			'click',
			function() {
				wppfm_backup();
			}
		);

		$( '#wppfm_cancel_backup' ).on(
			'click',
			function() {
				$( '#wppfm_backup-wrapper' ).hide();
			}
		);

		$( '#wppfm_backup-file-name' ).on(
			'keyup',
			function() {
				if ( '' !== $( '#wppfm_backup-file-name' ).val ) {
					$( '#wppfm_make_backup' ).attr( 'disabled', false );
				}
			}
		);
	}
);
