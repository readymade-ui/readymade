const documentation = {
  button: `
  <h2>rd-button</h2>
  <p>Button element that behaves like <span class="i__c">HTMLButtonElement</span> that can also be remotely triggered.</p>
  
  <p>rd-button can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>. The element has a similar interface to <span class="i__c">HTMLButtonElement</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">type</span> internal type for <span class="i__c">HTMLButtonElement</span>, i.e. "submit" </li>
      <li><span class="definition__title">value</span> the current form control value of the button</li>
      <li><span class="definition__title">label</span> label displayed outside the element</li>
      <li><span class="definition__title">width</span> the CSS width of the element</li>
      <li><span class="definition__title">height</span> the CSS height of the element</li>
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
      <li><span class="definition__title">simulatePress</span> flashes an active state, signaling the button has been activated</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
     <li><span class="definition__title">type</span> internal type for <span class="i__c">HTMLButtonElement</span>, i.e. "submit"  </li>
 </ul>     
  
  <h3>RdControl Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">label</span> label displayed outside the element (optional)</li>
      <li><span class="definition__title">width</span> the CSS width of the element (optional)</li>
      <li><span class="definition__title">height</span> the CSS height of the element (optional)</li>
      <li><span class="definition__title">style</span> CSS styles for the internal HTMLButtonElement (optional)</li>
  </ul>
  
  <r-code type="javascript">
              <span hidden>
{
name: 'button',
  attributes: {
    width: '100px',
    height: '44px',
    label: 'Label'
  },
}
        </span>
</r-code>
`,
  switch: `
  <h2>rd-switch</h2>
  <p>Toggle button <span class="i__c">HTMLButtonElement</span> that behaves like <span class="i__c">HTMLInputElement</span> with type <span class="i__c">checkbox</span>.</p>
  
  <p>rd-switch can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">checked</span> boolean value designating "true" or "false"</li>
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
 </ul>     
  
  <h3>RdControl Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">checked</span> boolean value designating "true" or "false" (readonly)</li>
  </ul>
  
  <r-code type="javascript">
              <span hidden>
{
  name: 'switch',
  currentValue: true,
  attributes: {
    checked: true
  },
}
        </span>
</r-code>
                                `,
  checkbox: `
  <h2>rd-checkbox</h2>
  <p>Checkbox <span class="i__c">HTMLButtonElement</span> that behaves like <span class="i__c">HTMLInputElement</span> with type <span class="i__c">checkbox</span>.</p>
  
  <p>rd-checkbox can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">checked</span> boolean value designating "true" or "false"</li>
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
 </ul>     
  
  <h3>RdControl Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">checked</span> boolean value designating "true" or "false" (readonly)</li>
  </ul>
  
  <r-code type="javascript">
              <span hidden>
{
  name: 'checkbox',
  currentValue: true,
  attributes: {
    checked: true
  },
}
        </span>
</r-code>
`,

  dial: `
  <h2>rd-dial</h2>
  <p>Rotary dial that sets a number between a minimum and maximum value.</p>
  
  <p>rd-dial can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.  Both modes require setting the <span class="i__c">RdControl</span> on the element.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
     <li><span class="definition__title">currentValue</span> number that represents the current state of the control</li>
 </ul>     
  
  <h3>RdControl Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">min</span> minimum value that should be output </li>
      <li><span class="definition__title">max</span> maximum value that should be output</li>
      <li><span class="definition__title">stops</span> Array of numbers, a mimumum and maximum angle, with 0 angle at the left-most position along the circumferance of the circle (optional)</li>
      <li><span class="definition__title">numberType</span> "int" or "float"</li>
  </ul>
  
  <r-code type="javascript">
              <span hidden>
{
name: 'dial',
 currentValue: 0.0,
 attributes: {
   min: 0.0,
   max: 1.0,
   stops: [-90, 270]
 },
}
          </span>
  </r-code>
`,

  slider: `
  <h2>rd-slider</h2>
  <p>Slider that sets a number or Array of number between a minimum and maximum value.</p>
  
  <p>rd-slider can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.  Both modes require setting the <span class="i__c">RdControl</span> on the element.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
     <li><span class="definition__title">type</span> specifies the type of slider, i.e. "hor", "vert", "joystick". When set to "joystick", rd-slider becomes two-dimensional and supports Array of number. </li>
     <li><span class="definition__title">currentValue</span> number or Array of number that represents the current state of the control</li>
 </ul>     
  
  <h3>RdControl Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">min</span> minimum value that should be output, Array of number for joystick </li>
      <li><span class="definition__title">max</span> maximum value that should be output, Array of number for joystick</li>
      <li><span class="definition__title">numberType</span> "int" or "float" (optional)</li>
      <li><span class="definition__title">snapToCenter</span> boolean, imitates how a traditional joystick returns to center (optional)</li>
      <li><span class="definition__title">orient</span> "is--vert", "is--hor", "is--joystick", "is--joystick-square" (optional)</li>
  </ul>
  
  
<r-code type="javascript">
              <span hidden>
{
   name: 'slider',
   type: 'is-vert',
   currentValue: 0,
   attributes: {
     min: 0.0,
     max: 1.0,
   },
}
          </span>
  </r-code>

  <r-code type="javascript">
              <span hidden>
{
   name: 'slider',
   type: 'is-joystick',
   currentValue: [0,0],
   attributes: {
     min: [0,0],
     max: [255,255],
     numberType: 'int'
   },
  }
          </span>
  </r-code>
`,
  input: `
  <h2>rd-input</h2>
  <p>Text input form control that behaves like <span class="i__c">HTMLInputElement</span>.</p>
  
  <p>rd-input can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>. The element has a similar interface to <span class="i__c">HTMLInputElement</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
     <li><span class="definition__title">type</span> internal type for <span class="i__c">HTMLInputElement</span>. If looking for "checkbox", or "radio", see other components.  </li>
 </ul>     

  
  <r-code type="javascript">
              <span hidden>
{
  name: 'input',
  currentValue: '',
  attributes: {},
}
        </span>
</r-code>
`,
  textarea: `
  <h2>rd-textaea</h2>
  <p>Text region form control that behaves like <span class="i__c">HTMLTextAreaElement</span>.</p>
  
  <p>rd-textarea can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
 </ul>     

  
  <r-code type="javascript">
              <span hidden>
{
  name: 'textarea',
  currentValue: '',
  attributes: {},
}
        </span>
</r-code>
`,
  dropdown: `
  <h2>rd-dropdown</h2>
  <p>Select from a list of options from a dropdown that behaves like <span class="i__c">HTMLSelectElement</span>.</p>
  
  <p>rd-dropdown can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
 </ul>   
 
 <h3>RdControl Attributes</h3>
 
 <ul class="definition__list">
     <li><span class="definition__title">options</span> Array of String that represent each option in the dropdown list. </li>
 </ul>  
  
  <r-code type="javascript">
              <span hidden>
{
  name: 'dropdown',
  currentValue: '',
  attributes: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
    ],
  },
}
        </span>
</r-code>
`,
  radio: `
  <h2>rd-radiogroup</h2>
  <p>Group of selectable radio buttons that behave like <span class="i__c">HTMLInputElement</span>.</p>
  
  <p>rd-radiogroup can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
     <li><span class="definition__title">currentValue</span> the current selected radio button </li>
 </ul>   
 
 <h3>RdControl Attributes</h3>
 
 <ul class="definition__list">
     <li><span class="definition__title">inputs</span> Array of Object that represent each input.</li>
     <li><span class="definition__title">direction</span> changes the orientation of the radio group to 'horizontal' or 'vertical' </li>
 </ul>  
  
  <r-code type="javascript">
              <span hidden>
{
  name: 'radio-group',
  currentValue: 'hue',
  attributes: {
    direction: 'vertical',
    inputs: [
      {
        value: 'hue',
        label: 'Hue',
        name: 'radio-group',
      },
      {
        value: 'saturation',
        label: 'Saturation',
        name: 'radio-group',
      },
      {
        value: 'brightness',
        label: 'Brightness',
        name: 'radio-group',
      },
    ],
  },
}
        </span>
</r-code>
`,
  buttonpad: `
  <h2>rd-buttonpad</h2>
  <p>Group of buttons displayed in a list or grid.</p>
  
  <p>rd-radiogroup can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.</p>
  
  <h3>Attributes</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">grid</span> model for styling the CSS grid and individual buttons</li>
      <li><span class="definition__title">buttons</span> Array of buttons that define the index, value and label of each button</li>
      <li><span class="definition__title">disabled</span> prevents the button pad from gaining focus (optional)</li>
      <li><span class="definition__title">control</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">channel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>Methods</h3>
  
  <ul class="definition__list">
      <li><span class="definition__title">setControl</span> model for <span class="i__c">RdControl</span> </li>
      <li><span class="definition__title">setChannel</span> name of the <span class="i__c">BroadcastChannel</span> (optional)</li>
  </ul>
  
  <h3>RdControl</h3>
  
 <ul class="definition__list">
     <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
 </ul>   
 
 <h3>RdControl Attributes</h3>
 
 <ul class="definition__list">
    <li><span class="definition__title">grid</span> model for styling the CSS grid and individual buttons</li>
    <li><span class="definition__title">buttons</span> Array of buttons that define the index, value and label of each button</li>
    <li><span class="definition__title">disabled</span> prevents the button pad from gaining focus (optional)</li>
 </ul>  
 
 
 The model for a standard keyboard is exported from @readymade/ui package named StandardKeyboard.
  
  <r-code type="javascript">
              <span hidden>
{
  name: 'keyboard',
  attributes: {
    buttons: StandardKeyboard,
    grid: {
      gap: '4px',
      columns: {
        count: 14,
      },
      buttonStyles: {
        width: '64px',
        height: '64px',
      },
      cells: [
        {
          selector: '[key="Space"]',
          styles: {
            width: '100%',
            gridColumn: 'span 3',
          },
        },
        {
          selector: '[key="Enter"]',
          styles: {
            width: '100%',
            gridColumn: 'span 2',
          },
        },
      ],
    },
  },
}
        </span>
</r-code>
`,
};

export default documentation;
