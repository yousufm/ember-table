import Ember from 'ember';
import RegisterTableComponentMixin from 'ember-table/mixins/register-table-component';
import LazyItemView from 'ember-table/views/lazy-item';
import template from 'ember-table/templates/lazy-row';

export default LazyItemView.extend(
RegisterTableComponentMixin, {
  template: template,
  classNames: 'ember-table-table-row',
  classNameBindings: ['row.isHovered:ember-table-hover',
      'row.isSelected:ember-table-selected',
      'row.rowStyle',
      'isLastRow:ember-table-last-row'],
  styleBindings: ['width', 'height'],
  row: Ember.computed.alias('content'),
  columns: Ember.computed.alias('parentView.columns'),
  width: Ember.computed.alias('tableComponent._rowWidth'),
  height: Ember.computed.alias('tableComponent.rowHeight'),

  // Use `lastItem` (set manually) instead of the array's built-in `lastObject`
  // to avoid creating a controller for last row on table initialization.  If
  // this TableRow is the last row, then the row controller should have been
  // created and set to `lastItem` in RowArrayController, otherwise `lastItem`
  // is null.
  isLastRow: Ember.computed(function() {
    return this.get('row') ===
        this.get('tableComponent.bodyContent.lastItem');
  }).property('tableComponent.bodyContent.lastItem', 'row'),

  // TODO(azirbel): Could simplify slightly via
  // this.set('row.isHovered', true) and remove the temp variable.
  // Also applies below/elsewhere.
  mouseEnter: function() {
    var row = this.get('row');
    if (row) {
      row.set('isHovered', true);
    }
  },

  mouseLeave: function() {
    var row = this.get('row');
    if (row) {
      row.set('isHovered', false);
    }
  },

  teardownContent: function() {
    var row = this.get('row');
    if (row) {
      row.set('isHovered', false);
    }
  }
});
