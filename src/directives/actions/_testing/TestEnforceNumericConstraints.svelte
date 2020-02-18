<script>
	import enforceNumericConstraints from '../enforceNumericConstraints'

	export let value = 1;
</script>
<label>Test enforce numeric constraints
<input
		data-testid="numeric-input"
		type="number"
		min="1"
		max="100"
		bind:value={value}
		use:enforceNumericConstraints
/></label>
<div data-testid="input-value">{value}</div>