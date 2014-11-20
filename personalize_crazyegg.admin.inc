<?php

/**
 * @file personalize_crazyegg.admin.inc
 * Provides functions needed for the admin UI.
 */

/**
 * Admin form for configuring CrazyEgg Integration.
 */
function personalize_crazyegg_admin_form($form, &$form_state) {
  //$form = array();

  $form['personalize_crazyegg_enabled'] = array(
      '#type' => 'radios',
      '#title' => t('Enable Crazyegg'),
      '#options' => array(
          TRUE => t('Yes'),
          FALSE => t('No'),
      ),
      '#default_value' => variable_get('personalize_crazyegg_enabled', TRUE),
  );

  $form['personalize_crazyegg_account_id'] = array(
      '#type' => 'textfield',
      '#title' => t('Crazyegg Account ID'),
      '#default_value' => variable_get('personalize_crazyegg_account_id', ''),
      '#description' => '(ex. 00111111)',
  );

  $form['personalize_crazyegg_api_key'] = array(
      '#type' => 'textfield',
      '#title' => t('Crazyegg API Key'),
      '#default_value' => variable_get('personalize_crazyegg_api_key', ''),
      '#description' => '(ex. 00111111)',
  );

  $form['personalize_crazyegg_api_secret'] = array(
      '#type' => 'textfield',
      '#title' => t('Crazyegg API Secret'),
      '#default_value' => variable_get('personalize_crazyegg_api_secret', ''),
      '#description' => '(ex. 00111111)',
  );

  $form['personalize_crazyegg_account_id'] = array(
      '#type' => 'textfield',
      '#title' => t('Crazy Egg Account ID'),
      '#default_value' => variable_get('personalize_crazyegg_account_id', ''),
      '#description' => '(ex. 00111111)',
  );
  return system_settings_form($form);
}