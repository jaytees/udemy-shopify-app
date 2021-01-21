import React, { useState } from 'react';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import store from 'store-js';

function Index() {
  // state
  const [modal, setModal] = useState({ open: false });
  // flag for if store is empty
  const isStoreEmpty = !store.get('ids');

  // function that is called by the resource picker onSelection method
  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set('ids', idsFromResources);
  };

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
      />
      <Layout>
        <EmptyState
          heading="Manage your inventory transfers"
          action={{ content: 'Select Products', onAction: () => setModal({ open: true }) }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        ></EmptyState>
      </Layout>
    </Page>
  );
}

export default Index;
