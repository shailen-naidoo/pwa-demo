echo ""
echo "run_network_caching_demo               Runs the Network Caching demo"
echo ""
echo "run_background_sync                    Runs the Background Sync demo"

function run_network_caching_demo {
  npx live-server network-caching/
}

function run_background_sync {
  node index.js & npx live-server background-sync/
}
