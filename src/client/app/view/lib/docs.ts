const documentation = {
  button: `
                <h2>rd-button</h2>
                <p>Button element that behaves like <span class="i__c">HTMLButtonElement</span> that can also be remotely triggered.</p>
                
                <p>rd-button can participate in a HTML form or be set as a <span class="i__c">RdControl</span> on <span class="i__c">RdSurface</span>.</p>
                
                <h3>Attributes</h3>
                
                <ul class="definition__list">
                    <li><span class="definition__title">type</span> internal type for <span class="i__c">HTMLButtonElement</span>, i.e. "submit" </li>
                    <li><span class="definition__title">value</span> label displayed inside the element</li>
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
                </ul>
                
                <h3>RdControl</h3>
                
               <ul class="definition__list">
                   <li><span class="definition__title">name</span> unique id for the element in a form or surface </li>
                   <li><span class="definition__title">type</span> internal type for <span class="i__c">HTMLButtonElement</span>, i.e. "submit"  </li>
                   <li><span class="definition__title">currentValue</span> label displayed inside the element </li>
               </ul>     
                
                <h3>RdControl Attributes</h3>
                
                <ul class="definition__list">
                    <li><span class="definition__title">label</span> label displayed outside the element (optional)</li>
                    <li><span class="definition__title">width</span> the CSS width of the element (optional)</li>
                    <li><span class="definition__title">height</span> the CSS height of the element (optional)</li>
                </ul>
                
                <r-code type="javascript">
                            <span hidden>
{
  name: 'button',
  currentValue: 'Inner Label',
  attributes: {
    width: '100px',
    height: '44px',
    label: 'Outer Label'
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
};

export default documentation;
